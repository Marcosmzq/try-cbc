import { InputType, Field } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateTriviasAnswerInput {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  statement: string;

  @IsBoolean()
  @IsNotEmpty()
  @Field(() => Boolean)
  isTrue: boolean;
}
