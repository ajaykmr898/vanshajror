import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { UsersController } from './controllers/users.controller';
import { User } from './entities/user.entity';
import { UsersService } from './services/users.service';
import { MailService } from '../mailer/mailer.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy, MailService],
  exports: [UsersService],
})
export class UsersModule {}
