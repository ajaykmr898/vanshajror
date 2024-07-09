import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, Like } from 'typeorm';
import { Marriage } from './entities/marriage.entity';
import { CreateMarriageDto } from './dto/create-marriage.dto';
import { UpdateMarriageDto } from './dto/update-marriage.dto';
import { UsersService } from '../users/services/users.service';

@Injectable()
export class MarriageService {
  constructor(
    @InjectRepository(Marriage)
    private marriageRepository: Repository<Marriage>,
    private usersService: UsersService,
  ) {}

  async create(createMarriageDto: CreateMarriageDto): Promise<Marriage> {
    const marriage = await this.marriageRepository.findOne({
      where: { owner_id: createMarriageDto.owner_id },
    });

    if (marriage) {
      throw new BadRequestException(
        'marriage request for the user is already present',
      );
    }
    const marriageN = this.marriageRepository.create(createMarriageDto);
    return await this.marriageRepository.save(marriageN);
  }

  async findAll(): Promise<Marriage[]> {
    let marriages = await this.marriageRepository.find();
    for (let marriage of marriages) {
      let user = await this.usersService.findOne(marriage.owner_id);
      marriage.user = user;
    }
    return marriages;
  }

  async findOne(id: number): Promise<Marriage> {
    const marriage = await this.marriageRepository.findOne({
      where: { id },
    });
    if (!marriage) {
      throw new NotFoundException(`Marriage  with ID ${id} not found`);
    }
    let user = await this.usersService.findOne(marriage.owner_id);
    marriage.user = user;

    return marriage;
  }

  async update(
    id: number,
    updateMarriageDto: UpdateMarriageDto,
  ): Promise<Marriage> {
    await this.marriageRepository.update(id, updateMarriageDto);
    const updatedMarriage = await this.marriageRepository.findOne({
      where: { id },
    });
    if (!updatedMarriage) {
      throw new NotFoundException(`Marriage with ID ${id} not found`);
    }
    return updatedMarriage;
  }

  async remove(id: number) {
    const marriage = await this.marriageRepository.findOne({ where: { id } });

    if (!marriage) {
      throw new NotFoundException(`marriage with id ${id} does not exist`);
    }

    return this.marriageRepository.remove(marriage);
  }

  async findFilters({
    fromDate,
    toDate,
    gender,
    poi,
    study,
    status,
    name,
    phone,
    email,
  }): Promise<Marriage[]> {
    const where: any = {
      created_at: Between(fromDate, toDate),
    };

    /*if (gender) {
      where.gender = gender;
    }*/

    /*if (poi) {
      where.poi = Like(`%${poi}%`);
    }*/

    /*if (study) {
      where.study = Like(`%${study}%`);
    }

    if (name) {
      where.name = Like(`%${name}%`);
    }

    if (phone) {
      where.phone = Like(`%${phone}%`);
    }

    if (email) {
      where.email = Like(`%${email}%`);
    }

    if (status) {
      where.status = status;
    }*/

    const marriages = await this.marriageRepository.find({
      where,
    });
    for (let marriage of marriages) {
      let user = await this.usersService.findOne(marriage.owner_id);
      marriage.user = user;
    }
    return marriages;
  }
}
