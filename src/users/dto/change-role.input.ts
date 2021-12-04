import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsInt } from 'class-validator';
import { UserRole } from '../enums/userRole.enum';

@InputType()
export class ChangeRoleInput {
  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  userID: number;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  adminSecretKey: string;

  @Field(() => UserRole)
  @IsString()
  @IsNotEmpty()
  newRole: UserRole;
}
