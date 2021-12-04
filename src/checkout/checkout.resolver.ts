import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from 'src/docorators/roles.decorator';
import { UserRole } from 'src/users/enums/userRole.enum';
import { CheckoutService } from './checkout.service';

@Resolver()
export class CheckoutResolver {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Mutation(() => String, { name: 'getInitPoint' })
  getInitPoint(@Args('userID') userID: number) {
    return this.checkoutService.getInitPoint(userID);
  }

  @Query(() => Boolean, { name: 'checkIfUserHasApprovedPayments' })
  @Roles(UserRole.ADMIN)
  checkPayments(@Args('userID') userID: number) {
    return this.checkoutService.checkIfUserHasApprovedPayments(userID);
  }
}
