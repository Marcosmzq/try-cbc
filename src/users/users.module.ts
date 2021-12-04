import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { User } from './entities/user.entity';
import { JwtService } from 'src/jwt/jwt.service';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { NodemailerService } from 'src/nodemailer/nodemailer.service';
import { CheckoutService } from 'src/checkout/checkout.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UsersResolver,
    UsersService,
    JwtService,
    BcryptService,
    NodemailerService,
    CheckoutService,
  ],
})
export class UsersModule {}
