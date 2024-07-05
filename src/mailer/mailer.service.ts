import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendUserConfirmation(email: string, otp: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Your OTP Code',
      template: './otp',
      context: {
        otp,
      },
    });
  }
}
