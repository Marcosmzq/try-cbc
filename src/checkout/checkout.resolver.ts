import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AdminAuthGuard } from 'src/auth/guards/admin-role.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CheckoutService } from './checkout.service';

@Resolver()
export class CheckoutResolver {
  constructor(private readonly checkoutService: CheckoutService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => String, { name: 'getInitPoint' })
  getInitPoint(@Args('user_id') user_id: number) {
    return this.checkoutService.getInitPoint(user_id);
  }

  @UseGuards(AdminAuthGuard)
  @Query(() => Boolean, { name: 'checkIfUserHasApprovedPayments' })
  checkPayments(@Args('user_id') user_id: number) {
    return this.checkoutService.checkIfUserHasApprovedPayments(user_id);
  }
}
