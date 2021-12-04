import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty } from 'class-validator';

@InputType()
export class RecoveryPasswordInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  userToken: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  newPassword: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  confirmNewPassword: string;
}
