import { registerEnumType } from '@nestjs/graphql';

export enum ExamList {
  FIRST = 'FIRST',
  SECOND = 'SECOND',
  FINAL = 'FINAL',
}

registerEnumType(ExamList, {
  name: 'ExamList',
});
