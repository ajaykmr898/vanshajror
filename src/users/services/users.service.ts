import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { createHash } from 'crypto';
import { Repository } from 'typeorm';
import {
  CreateAdminDto,
  CreateUserDto,
  UpdateUserDto,
} from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import {
  addHours,
  addMinutes,
  format,
  formatISO,
  isBefore,
  parseISO,
  subSeconds,
} from 'date-fns';
import { MailService } from '../../mailer/mailer.service';
import { PersonalDetails } from '../entities/details.entity';
import { Education } from '../entities/education.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly mailService: MailService,
    @InjectRepository(PersonalDetails)
    private readonly personalDetailsRepository: Repository<PersonalDetails>,
    @InjectRepository(Education)
    private readonly educationRepository: Repository<Education>,
  ) {}

  async create(createUserDto: CreateUserDto | CreateAdminDto) {
    const user = await this.userRepository.findOne({
      where: { email: createUserDto.email, deleted: false },
    });

    if (user) {
      throw new BadRequestException(
        'User with provided email is already present',
      );
    }
    const { personalDetails, education, ...userDetails } = createUserDto;
    const createdUser = this.userRepository.create(userDetails);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    createdUser.regcode = otp;
    createdUser.issignedup = '0';

    const now = new Date();

    const tenMinutesFromNow = addMinutes(now, 10);
    createdUser.reqcodeexptime = formatISO(tenMinutesFromNow);
    createdUser.reglink = uuidv4();

    const twentyFourHoursFromNow = addHours(now, 24);
    createdUser.reglinkexptime = formatISO(twentyFourHoursFromNow);

    try {
      await this.mailService.sendUserConfirmation(
        createdUser.email,
        otp,
        createdUser.firstName,
      );
    } catch (err) {
      throw new BadRequestException('Unable to send OTP email');
    }
    const saveUser = await this.userRepository.save(createdUser);

    if (personalDetails) {
      const createdPersonalDetails =
        this.personalDetailsRepository.create(personalDetails);
      createdPersonalDetails.user_id = saveUser.id;
      const savedPersonalDetails = await this.personalDetailsRepository.save(
        createdPersonalDetails,
      );
      createdUser.personalDetails = savedPersonalDetails[0];
    }

    if (education) {
      const createdEducations = this.educationRepository.create(education);
      createdEducations.user_id = saveUser.id;
      const savedEducations = await this.educationRepository.save(
        createdEducations,
      );
      createdUser.education = savedEducations[0];
    }
    delete saveUser.password;
    delete saveUser.refreshToken;
    return saveUser;
  }

  async findAll() {
    const users = await this.userRepository.find({ where: { deleted: false } });
    let resp = users.map((user) => {
      let personalDetails = this.getPersonalDetails(user.id);
      let education = this.getEducation(user.id);
      return { ...user, personalDetails, education };
    });
    return resp;
  }

  async getPersonalDetails(userId) {
    const personalDetails = await this.personalDetailsRepository.findOne({
      where: { user_id: userId },
    });
    return personalDetails;
  }

  async getEducation(userId) {
    const education = await this.educationRepository.findOne({
      where: { user_id: userId },
    });
    return education;
  }

  async findByEmailAndGetPassword(email: string) {
    return await this.userRepository.findOne({
      select: ['id', 'password', 'role', 'issignedup'],
      where: { email },
    });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} does not exist`);
    }
    user.personalDetails = await this.getPersonalDetails(id);
    user.education = await this.getEducation(id);
    return user;
  }

  async findById(id: number) {
    //return await this.userRepository.findOneOrFail({ where: { id: userId } });
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with id ${id} does not exist`);
    }
    return user;
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOneOrFail({
      where: { email },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    let updateUser = await this.userRepository.findOne({
      where: { id },
    });
    if (!updateUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    //if (!updateUser) {
    updateUser = await this.userRepository.findOne({
      where: { email: updateUserDto.email },
    });

    if (updateUser && updateUser?.id !== id) {
      throw new BadRequestException(
        `A user with provided email is already present`,
      );
    }
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    const { personalDetails, education, ...userDetails } = updateUserDto;

    await this.userRepository.update(id, userDetails);

    let existingPersonalDetails: any =
      await this.personalDetailsRepository.findOne({
        where: { user_id: id },
      });
    if (personalDetails) {
      if (!existingPersonalDetails) {
        existingPersonalDetails =
          this.personalDetailsRepository.create(personalDetails);
      } else {
        Object.assign(existingPersonalDetails, personalDetails);
      }
      existingPersonalDetails.user_id = id;
      const savedPersonalDetails = await this.personalDetailsRepository.save(
        existingPersonalDetails,
      );
    }
    if (education) {
      let existingEducation: any = await this.educationRepository.findOne({
        where: { user_id: id },
      });
      if (!existingEducation) {
        existingEducation = this.educationRepository.create(education);
      } else {
        Object.assign(existingEducation, education);
      }
      existingEducation.user_id = id;
      const savedEducation = await this.educationRepository.save(
        existingEducation,
      );
    }
    const updatedUser = await this.userRepository.findOne({ where: { id } });
    return updatedUser;
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({
      where: { id, deleted: false },
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} does not exist`);
    }
    user.deleted = true;
    user.email = user.email + '@deleted';
    return this.userRepository.save(user);
  }

  async setCurrentRefreshToken(refreshToken: string, userId: number) {
    //crypto is a node module, and bcrypt the maximum length of the hash is 60 characters, and token is longer than that, so we need to hash it
    const hash = createHash('sha256').update(refreshToken).digest('hex');

    const currentHashedRefreshToken = await bcrypt.hashSync(hash, 10);
    return await this.userRepository.update(userId, {
      refreshToken: currentHashedRefreshToken,
    });
  }

  async removeRefreshToken(userId: number) {
    await this.findById(userId);

    return this.userRepository.update(
      { id: userId },
      {
        refreshToken: null,
      },
    );
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: number) {
    const user = await this.userRepository.findOne({
      select: ['id', 'refreshToken', 'role'],
      where: { id: userId },
    });

    const hash = createHash('sha256').update(refreshToken).digest('hex');
    const isRefreshTokenMatching = await bcrypt.compare(
      hash,
      user.refreshToken,
    );

    if (isRefreshTokenMatching) {
      return { id: user.id, role: user.role };
    }
  }

  async confirmOtp(email: string, otp: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email, regcode: otp },
    });
    if (user && isBefore(new Date(), user.reqcodeexptime)) {
      user.issignedup = '1';
      user.regcode = null;
      user.reqcodeexptime = null;
      return this.userRepository.save(user);
    }
    throw new UnauthorizedException('Invalid or expired OTP');
  }

  async confirmEmail(email: string, token: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email, reglink: token },
    });
    if (user && isBefore(new Date(), user.reglinkexptime)) {
      user.issignedup = '1';
      user.reglink = null;
      user.reglinkexptime = null;
      return this.userRepository.save(user);
    }
    throw new UnauthorizedException(
      'Invalid or expired email confirmation link',
    );
  }

  async resendOtp(email: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException(`User with email ${email} does not exist`);
    }

    const now = new Date();
    const bufferTime = subSeconds(user.reqcodeexptime, 50);
    const isBeforeBuffer = isBefore(now, bufferTime);

    /*if (isBeforeBuffer) {
      throw new BadRequestException(
        'You can request a new OTP after 60 seconds',
      );
    }*/

    user.regcode = Math.floor(100000 + Math.random() * 900000).toString();
    const tenMinutesFromNow = addMinutes(new Date(), 10);
    user.reqcodeexptime = formatISO(tenMinutesFromNow);
    try {
      await this.mailService.sendUserConfirmation(
        email,
        user.regcode,
        user.firstName,
      );
    } catch (err) {
      throw new BadRequestException('Unable to send OTP email');
    }

    await this.userRepository.save(user);
  }
}
