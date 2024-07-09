import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarriageService } from './marriages.service';
import { MarriageController } from './marriages.controller';
import { Marriage } from './entities/marriage.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Marriage]), UsersModule],
  providers: [MarriageService],
  controllers: [MarriageController],
})
export class MarriagesModule {}
