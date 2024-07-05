import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { MailService } from './mailer.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@ApiTags('mailer')
@Controller('mailer')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MailerController {
  constructor(private readonly mailerService: MailService) {}

  @Post('send')
  async sendUserConfirmation(@Body() compareAnswersDto: string) {
    const response = await this.mailerService.sendUserConfirmation(
      compareAnswersDto,
      compareAnswersDto,
    );
    return response;
  }
}
