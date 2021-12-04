import { registerEnumType } from '@nestjs/graphql';

export enum AnswerType {
  ANSWER = 'ANSWER',
  JUSTIFICATION = 'JUSTIFICATION',
}

registerEnumType(AnswerType, {
  name: 'AnswerType',
});
