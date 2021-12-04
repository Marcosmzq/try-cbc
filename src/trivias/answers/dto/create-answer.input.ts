import { InputType, Int, Field } from '@nestjs/graphql';
import { IsBoolean, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { AnswerType } from '../enums/answerType.enum';

@InputType()
export class CreateAnswerInput {
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
  @Field(() => AnswerType)
  type: AnswerType;
}
