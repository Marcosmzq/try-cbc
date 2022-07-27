import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty } from 'class-validator';

@InputType()
export class RecoveryPasswordWithTokenInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  access_token: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  newPassword: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  confirmNewPassword: string;
}
