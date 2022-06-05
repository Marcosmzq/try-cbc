import { InputType, Int, Field } from '@nestjs/graphql';
import { IsBoolean, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { TriviasAnswerType } from '../enums/triviasAnswerType.enum';

@InputType()
export class CreateTriviasAnswerInput {
  @IsInt()
  @IsNotEmpty()
  @Field(() => Int)
  trivia_id: number;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  statement: string;

  @IsBoolean()
  @IsNotEmpty()
  @Field(() => Boolean)
  isTrue: boolean;

  @IsString()
  @IsNotEmpty()
  @Field(() => TriviasAnswerType)
  type: TriviasAnswerType;
}
