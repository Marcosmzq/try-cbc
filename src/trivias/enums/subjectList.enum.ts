import { registerEnumType } from '@nestjs/graphql';

export enum SubjectList {
  IPC = 'IPC',
  ICSE = 'ICSE',
}

registerEnumType(SubjectList, {
  name: 'SubjectList',
});
