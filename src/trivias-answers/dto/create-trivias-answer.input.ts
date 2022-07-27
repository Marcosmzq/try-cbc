import { InputType, Int, Field } from '@nestjs/graphql';
import { IsBoolean, IsInt, IsNotEmpty, IsString } from 'class-validator';

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
}
