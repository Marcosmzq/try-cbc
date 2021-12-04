import { InputType, Field, Int } from '@nestjs/graphql';
import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsDefined,
  IsEmail,
} from 'class-validator';
import { UserRole } from '../../users/enums/userRole.enum';

@InputType()
export class CreateTokenInput {
  @Field(() => Int)
  @IsInt()
  @IsDefined()
  id: number;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  username: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  expiresIn: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  role: UserRole;
}
