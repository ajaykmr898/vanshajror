import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, Connection, QueryRunner } from 'typeorm';
import { Marriage } from './entities/marriage.entity';
import { CreateMarriageDto } from './dto/create-marriage.dto';
import { UpdateMarriageDto } from './dto/update-marriage.dto';
import { UsersService } from '../users/services/users.service';

@Injectable()
export class MarriageService {
  queryRunner: QueryRunner;
  constructor(
    @InjectRepository(Marriage)
    private marriageRepository: Repository<Marriage>,
    private usersService: UsersService,
    private connection: Connection, // Inject TypeORM Connection
  ) {
    this.queryRunner = this.connection.createQueryRunner();
  }

  async create(createMarriageDto: CreateMarriageDto): Promise<Marriage> {
    const marriage = await this.marriageRepository.findOne({
      where: {
        owner_id: createMarriageDto.owner_id,
        deleted: false,
        open_to_marriage: true,
      },
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

  async findFilters(filters: {
    fromDate?: Date;
    toDate?: Date;
    gender?: string;
    //location?: object;
    study?: string;
    status?: string;
    name?: string;
    phone?: string;
    email?: string;
  }): Promise<any[]> {
    const {
      fromDate,
      toDate,
      gender,
      //location,
      study,
      status,
      name,
      phone,
      email,
    } = filters;

    let sql = `
      SELECT mr.id as mrid, mr.extra_info, mr.status, mr.owner_id
      FROM marriage_requests mr
      JOIN users u ON mr.owner_id = u.id
      WHERE u.deleted = false AND mr.deleted = false AND open_to_marriage = true
    `;

    const parameters: any = [];

    if (fromDate && toDate) {
      sql += ' AND mr.created_at BETWEEN $1 AND $2';
      parameters.push(fromDate, toDate);
    }

    await this.queryRunner.connect();
    const marriages = await this.queryRunner.query(sql, parameters);
    for (let marriage of marriages) {
      let user = await this.usersService.findOne(marriage.owner_id);
      marriage.user = user;
    }
    return marriages;
  }
}
