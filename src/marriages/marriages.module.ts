import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarriageService } from './marriages.service';
import { MarriageController } from './marriages.controller';
import { Marriage } from './entities/marriage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Marriage])],
  providers: [MarriageService],
  controllers: [MarriageController],
})
export class MarriagesModule {}
