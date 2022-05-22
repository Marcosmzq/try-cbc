import { registerEnumType } from '@nestjs/graphql';

export enum TriviaType {
  TRIVIA = 'TRIVIA',
  FLASHCARD = 'FLASHCARD',
}

registerEnumType(TriviaType, {
  name: 'TriviaType',
});
