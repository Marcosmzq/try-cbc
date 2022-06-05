import { registerEnumType } from '@nestjs/graphql';

export enum TriviasAnswerType {
  ANSWER = 'ANSWER',
  JUSTIFICATION = 'JUSTIFICATION',
}

registerEnumType(TriviasAnswerType, {
  name: 'TriviasAnswerType',
});
