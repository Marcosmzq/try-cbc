import { BadRequestException, Injectable } from '@nestjs/common';
import { SendMailOptionsInput } from './dto/send-options.input';
import * as nodemailer from 'nodemailer';
import { recoveryPasswordEmailMessage } from './messages-templates/recovery-password-email.template';
@Injectable()
export class NodemailerService {
  transporter() {
    return nodemailer.createTransport({
      //@ts-ignore
      host: 'smtp-mail.outlook.com',
      secureConnection: false,
      port: 587,
      tls: {
        ciphers: 'SSLv3',
      },
      auth: {
        user: process.env.NODEMAILER_AUTH_USER,
        pass: process.env.NODEMAILER_AUTH_PASSWORD,
      },
    });
  }

  sendMail(sendOptions: SendMailOptionsInput) {
    const transporter = this.transporter();

    transporter.sendMail(sendOptions, (error, info) => {
      if (error) {
        throw new BadRequestException();
      }
    });

    return 'Sent email';
  }

  async sendRecoveryPasswordEmail(
    userEmail: string,
    username: string,
    access_token: string,
  ) {
    const message = recoveryPasswordEmailMessage(
      username,
      userEmail,
      access_token,
    );
    return this.sendMail(message);
  }
}
