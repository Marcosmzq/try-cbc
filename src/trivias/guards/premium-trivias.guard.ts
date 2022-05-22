import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInputError } from 'apollo-server-express';
import { JwtService } from 'src/jwt/jwt.service';
import { Subject } from 'src/subjects/entities/subject.entity';
import { UserRole } from 'src/users/enums/userRole.enum';
import { Repository } from 'typeorm';

@Injectable()
export class PremiumTriviasGuard implements CanActivate {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
    private jwtService: JwtService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const args = context.getArgByIndex(1);
    const req = context.getArgByIndex(2).req;

    const subject = await this.subjectRepository.findOne({
      id: args.subject_id,
    });
    if (!subject) {
      throw new UserInputError(
        'No se ha encontrado ninguna materia con la información enviada, por favor intentar de nuevo.',
      );
    }
    const IsPremiumContent: boolean = subject.isPremium;
    if (IsPremiumContent === false) {
      return true;
    }
    if (IsPremiumContent) {
      const token = await this.jwtService.getToken(req);
      const user = await this.jwtService.decodeToken(token);
      if (user.role === (UserRole.PREMIUM_USER || UserRole.ADMIN)) return true;
      else {
        throw new UnauthorizedException({
          message: `Debes iniciar sesion y ser usuario premiun para acceder a este contenido. Visita ${process.env.CLIENT_URL}/premium para más información.`,
        });
      }
    }
  }
}
