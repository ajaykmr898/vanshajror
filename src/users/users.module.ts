import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { UsersController } from './controllers/users.controller';
import { User } from './entities/user.entity';
import { UsersService } from './services/users.service';
import { MailService } from '../mailer/mailer.service';
import { PersonalDetails } from './entities/details.entity';
import { Education } from './entities/education.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, PersonalDetails, Education])],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy, MailService],
  exports: [UsersService],
})
export class UsersModule {}
