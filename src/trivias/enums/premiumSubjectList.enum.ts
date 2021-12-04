import { registerEnumType } from '@nestjs/graphql';

export enum PremiumSubjectList {
  ICSE = 'ICSE',
}

registerEnumType(PremiumSubjectList, {
  name: 'PremiumSubjectList',
});
