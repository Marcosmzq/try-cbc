import { Injectable } from '@nestjs/common';
import { SendMailOptionsInput } from './dto/send-options.input';
const nodemailer = require('nodemailer');

@Injectable()
export class NodemailerService {
  transporter() {
    return nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.NODEMAILER_AUTH_USER,
        pass: process.env.NODEMAILER_AUTH_PASSWORD,
      },
    });
  }

  sendMail(sendOptions: SendMailOptionsInput) {
    const transporter = this.transporter();

    transporter.sendMail(sendOptions, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent');
      }
    });
  }
}
