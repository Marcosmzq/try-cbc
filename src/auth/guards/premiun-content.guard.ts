import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserRole } from 'src/users/enums/userRole.enum';

@Injectable()
export class PremiumContentGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    const user_role = request.user.role;

    if (user_role !== UserRole.PREMIUM_USER) {
      throw new UnauthorizedException(
        `You must be a premium user to access to this content. See more in: ${process.env.CLIENT_URL}/pricing`,
      );
    }

    return true;
  }
}
