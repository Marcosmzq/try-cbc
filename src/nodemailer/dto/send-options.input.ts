import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

@InputType()
export class SendMailOptionsInput {
  @Field(() => String)
  @IsEmail()
  @IsNotEmpty()
  from: string;

  @Field(() => String)
  @IsEmail()
  @IsNotEmpty()
  to: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  subject: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  text?: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  html?: string;
}
