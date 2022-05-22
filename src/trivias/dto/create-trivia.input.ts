import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsOptional, IsInt } from 'class-validator';
import { ExamList } from '../enums/examList.enum';
import { TriviaType } from '../enums/triviaType.enum';

@InputType()
export class CreateTriviaInput {
  @IsInt()
  @IsNotEmpty()
  @Field(() => Int)
  subject_id: number;

  @Field(() => TriviaType)
  @IsNotEmpty()
  type: TriviaType;

  @Field(() => ExamList)
  @IsNotEmpty()
  exam: ExamList;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  statement: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  source: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  feedback?: string;
}
