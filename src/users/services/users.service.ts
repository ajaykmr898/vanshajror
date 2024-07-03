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
import * as moment from 'moment';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto | CreateAdminDto) {
    const user = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (user) {
      throw new BadRequestException(
        'User with provided email is already present',
      );
    }

    const createdUser = this.userRepository.create(createUserDto);
    createdUser.regcode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();
    createdUser.reqcodeexptime = moment().add(10, 'minutes').toISOString();
    createdUser.reglink = uuidv4();
    createdUser.reglinkexptime = moment().add(24, 'hours').toISOString();
    createdUser.issignedup = false;
    const saveUser = await this.userRepository.save(createdUser);
    delete saveUser.password;
    delete saveUser.refreshToken;
    return saveUser;
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findByEmailAndGetPassword(email: string) {
    return await this.userRepository.findOne({
      select: ['id', 'password', 'role'],
      where: { email },
    });
  }

  async findOne(id: number) {
    //return await this.userRepository.findOne({ where: { id } });
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} does not exist`);
    }
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

    await this.userRepository.update(id, updateUserDto);
    const updatedUser = await this.userRepository.findOne({ where: { id } });
    return updatedUser;
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with id ${id} does not exist`);
    }

    return this.userRepository.remove(user);
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
    if (user && moment().isBefore(user.reqcodeexptime)) {
      user.issignedup = true;
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
    if (user && moment().isBefore(user.reglinkexptime)) {
      user.issignedup = true;
      user.reglink = null;
      user.reglinkexptime = null;
      return this.userRepository.save(user);
    }
    throw new UnauthorizedException(
      'Invalid or expired email confirmation link',
    );
  }
}
