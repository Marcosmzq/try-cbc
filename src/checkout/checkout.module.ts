import { Module } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckoutResolver } from './checkout.resolver';

@Module({
  providers: [CheckoutResolver, CheckoutService],
  exports: [CheckoutService],
})
export class CheckoutModule {}
