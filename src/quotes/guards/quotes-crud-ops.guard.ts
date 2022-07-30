import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserInputError } from 'apollo-server-express';
import { QuotesService } from '../quotes.service';

@Injectable()
export class QuotesCrudOpsGuard implements CanActivate {
  constructor(private readonly quotesService: QuotesService) {}

  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    const quote_id = ctx.getArgs().quote_id;
    const user_id = request.user.id;

    const quote = await this.quotesService.findOne(quote_id);
    if (!quote) throw new UserInputError('The quote id provided is wrong.');
    if (quote.user.id !== user_id)
      throw new UnauthorizedException(
        'You are not allowed to operate with records of other user.',
      );

    return true;
  }
}
