import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../enums/userRole.enum';
import { ROLES_KEY } from '../../docorators/roles.decorator';
import { JwtService } from 'src/jwt/jwt.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    const req = context.getArgs()[2].req;

    const token = await this.jwtService.getToken(req);
    const user = await this.jwtService.decodeToken(token);
    return requiredRoles.some((role) => user.role?.includes(role));
  }
}
