import { Module } from '@nestjs/common';
import { NodemailerService } from './nodemailer.service';

@Module({ exports: [NodemailerService], providers: [NodemailerService] })
export class NodemailerModule {}
