import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UserInputError } from 'apollo-server-express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRole } from 'src/users/enums/userRole.enum';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AdminRoleStrategy extends PassportStrategy(Strategy, 'adminRole') {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const user = await this.usersService.findOne(payload.id);
    if (!user) throw new UserInputError('User id provided is wrong');
    if (user.role !== UserRole.ADMIN) {
      throw new UnauthorizedException('ADMIN ROLE IS REQUIRED');
    }
    return user;
  }
}
