import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInputError } from 'apollo-server-express';
import { Course } from 'src/courses/entities/course.entity';
import { JwtService } from 'src/jwt/jwt.service';
import { UserRole } from 'src/users/enums/userRole.enum';
import { Repository } from 'typeorm';

@Injectable()
export class PremiumTriviasGuard implements CanActivate {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    private jwtService: JwtService,
  ) { }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const args = context.getArgByIndex(1);
    const req = context.getArgByIndex(2).req;

    const course = await this.courseRepository.findOne({
      id: args.course_id,
    });
    if (!course) {
      throw new UserInputError(
        'No se ha encontrado ningun curso con la información enviada, por favor intentar de nuevo.',
      );
    }
    const IsPremiumContent: boolean = course.isPremium;
    if (IsPremiumContent === false) {
      return true;
    }
    if (IsPremiumContent) {
      const token = await this.jwtService.getToken(req);
      const user = await this.jwtService.decodeToken(token);
      if (user.role === (UserRole.ADMIN || UserRole.PREMIUM_USER)) return true;
      else {
        throw new UnauthorizedException({
          message: `Debes iniciar sesion y ser usuario premiun para acceder a este contenido. Visita ${process.env.CLIENT_URL}/premium para más información.`,
        });
      }
    }
  }
}
