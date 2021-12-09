import { registerEnumType } from '@nestjs/graphql';

export enum PremiumSubjectList {
  IPC = 'IPC',
}

registerEnumType(PremiumSubjectList, {
  name: 'PremiumSubjectList',
});
