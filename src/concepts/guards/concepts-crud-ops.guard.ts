import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserInputError } from 'apollo-server-express';
import { ConceptsService } from '../concepts.service';

@Injectable()
export class ConceptsCrudOpsGuard implements CanActivate {
  constructor(private readonly conceptsService: ConceptsService) {}

  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    const trivia_id = ctx.getArgs().trivia_id;
    const user_id = request.user.id;

    const trivia = await this.conceptsService.findOne(trivia_id);
    if (!trivia) throw new UserInputError('The trivia id provided is wrong.');
    if (trivia.author.id !== user_id)
      throw new UnauthorizedException(
        'You are not allowed to operate with records of other user.',
      );

    return true;
  }
}
