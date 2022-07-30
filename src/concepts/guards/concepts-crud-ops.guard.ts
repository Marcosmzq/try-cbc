import {
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
    const concept_id = ctx.getArgs().concept_id;
    const user_id = request.user.id;

    const concept = await this.conceptsService.findOne(concept_id);
    if (!concept) throw new UserInputError('The concept id provided is wrong.');
    if (concept.author.id !== user_id)
      throw new UnauthorizedException(
        'You are not allowed to operate with records of other user.',
      );

    return true;
  }
}
