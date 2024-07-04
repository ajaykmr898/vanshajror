import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Offer } from './entities/offer.entity';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offersRepository: Repository<Offer>,
  ) {}

  async findAll(): Promise<Offer[]> {
    return this.offersRepository.find();
  }

  async findOne(id: number): Promise<Offer> {
    const offer = await this.offersRepository.findOne({ where: { id } });
    if (!offer) {
      throw new NotFoundException(`Offer with ID ${id} not found`);
    }
    return offer;
  }

  async create(createOfferDto: CreateOfferDto): Promise<Offer> {
    const newOffer = this.offersRepository.create(createOfferDto);
    return this.offersRepository.save(newOffer);
  }

  async update(id: number, updateOfferDto: UpdateOfferDto): Promise<Offer> {
    const offer = await this.findOne(id);
    this.offersRepository.merge(offer, updateOfferDto);
    return this.offersRepository.save(offer);
  }

  async remove(id: number): Promise<void> {
    const offer = await this.findOne(id);
    await this.offersRepository.remove(offer);
  }
}
