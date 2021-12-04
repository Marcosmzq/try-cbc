import { Module } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckoutResolver } from './checkout.resolver';

@Module({
  providers: [CheckoutResolver, CheckoutService]
})
export class CheckoutModule {}
