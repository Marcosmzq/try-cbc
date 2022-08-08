import { PipeTransform, Injectable } from '@nestjs/common';
import { UserInputError } from 'apollo-server-express';
import { TriviasAnswersService } from '../trivias-answers.service';

@Injectable()
export class TriviaAnswerByIdPipe implements PipeTransform {
  constructor(private readonly triviasAnswersService: TriviasAnswersService) {}

  async transform(value: any) {
    const answer = await this.triviasAnswersService.findOne(value);
    if (!answer)
      throw new UserInputError(
        'The trivia answer id provided is wrong, try with other.',
      );
    return answer;
  }
}
