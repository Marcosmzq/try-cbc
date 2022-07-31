import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { User } from './entities/user.entity';
import { CheckoutModule } from 'src/checkout/checkout.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CheckoutModule],
  exports: [UsersService],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
