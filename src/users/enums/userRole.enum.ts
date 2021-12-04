import { registerEnumType } from '@nestjs/graphql';

export enum UserRole {
  ADMIN = 'ADMIN',
  FREE_USER = 'FREE_USER',
  PREMIUM_USER = 'PREMIUM_USER',
}

registerEnumType(UserRole, {
  name: 'UserRole',
});
