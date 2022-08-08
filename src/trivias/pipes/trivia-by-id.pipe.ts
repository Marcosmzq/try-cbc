import { PipeTransform, Injectable } from '@nestjs/common';
import { UserInputError } from 'apollo-server-express';
import { TriviasService } from '../trivias.service';

@Injectable()
export class TriviaByIdPipe implements PipeTransform {
  constructor(private readonly triviasService: TriviasService) {}

  async transform(value: any) {
    const trivia = await this.triviasService.findOne(value);
    if (!trivia)
      throw new UserInputError(
        'The trivia id provided is wrong, try with other.',
      );
    return trivia;
  }
}
