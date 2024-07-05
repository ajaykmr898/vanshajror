import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import axios from 'axios';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendUserConfirmation(email: string, otp: string, firstName: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Ror OTP Code',
      template: './otp',
      context: {
        otp,
        softwareName: 'Ror',
        firstName,
      },
    });
  }

  async sendUserConfirmation1(email: string, otp: string) {
    let data = {
      service_id: 'service_anfkdec',
      template_id: 'template_px4i2lf',
      user_id: 'sn9by5lS1x_whdjOl',
      template_params: {
        userMail: email,
        regLinkMail: otp,
        regCode: otp,
        firstName: email,
      },
    };

    const options = {
      method: 'post',
      url: 'https://api.emailjs.com/api/v1.0/email/send',
      data: data,
      contentType: 'application/json',
    };

    const response = await axios(options);
    return response;
  }
}
