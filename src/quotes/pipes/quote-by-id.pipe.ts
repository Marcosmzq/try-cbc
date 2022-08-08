import { PipeTransform, Injectable } from '@nestjs/common';
import { UserInputError } from 'apollo-server-express';
import { QuotesService } from '../quotes.service';

@Injectable()
export class QuoteByIdPipe implements PipeTransform {
  constructor(private readonly quotesService: QuotesService) {}

  async transform(value: any) {
    const quote = await this.quotesService.findOne(value);
    if (!quote)
      throw new UserInputError(
        'The quote id provided is wrong, try with other.',
      );
    return quote;
  }
}
