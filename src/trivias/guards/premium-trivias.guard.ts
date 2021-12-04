import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from 'src/jwt/jwt.service';
import { UserRole } from 'src/users/enums/userRole.enum';
import { PremiumSubjectList } from '../enums/premiumSubjectList.enum';

@Injectable()
export class PremiumTriviasGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const args = context.getArgByIndex(1);
    const req = context.getArgByIndex(2).req;

    const IsPremiumContent: boolean = Object.keys(PremiumSubjectList).some(
      (keys) => keys === args.subject,
    );
    if (IsPremiumContent === false) {
      return true;
    }
    if (IsPremiumContent) {
      const token = await this.jwtService.getToken(req);
      const user = await this.jwtService.decodeToken(token);
      if (user.role === (UserRole.PREMIUM_USER || UserRole.ADMIN)) return true;
      else {
        throw new UnauthorizedException({
          message: 'Make you premium user for unlock this content.',
        });
      }
    }
  }
}
