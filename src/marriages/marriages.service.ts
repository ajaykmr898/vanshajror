import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Marriage } from './entities/marriage.entity';
import { CreateMarriageDto } from './dto/create-marriage.dto';
import { UpdateMarriageDto } from './dto/update-marriage.dto';

@Injectable()
export class MarriageService {
  constructor(
    @InjectRepository(Marriage)
    private marriageRepository: Repository<Marriage>,
  ) {}

  create(createMarriageDto: CreateMarriageDto): Promise<Marriage> {
    const marriage = this.marriageRepository.create(createMarriageDto);
    return this.marriageRepository.save(marriage);
  }

  findAll(): Promise<Marriage[]> {
    return this.marriageRepository.find();
  }

  async findOne(id: number): Promise<Marriage> {
    const marriage = await this.marriageRepository.findOne({
      where: { id },
    });
    if (!marriage) {
      throw new NotFoundException(`Marriage  with ID ${id} not found`);
    }
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
      throw new NotFoundException(`Marriage  with ID ${id} not found`);
    }
    return updatedMarriage;
  }

  async remove(id: number): Promise<void> {
    const result = await this.marriageRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Marriage  with ID ${id} not found`);
    }
  }
}
