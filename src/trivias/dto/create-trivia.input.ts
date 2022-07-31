import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';
import { ExamList } from '../enums/examList.enum';

@InputType()
export class CreateTriviaInput {
  @Field(() => Boolean)
  @IsBoolean()
  isTrivia: boolean;

  @Field(() => Boolean)
  @IsBoolean()
  isFlashcard: boolean;

  @Field(() => ExamList)
  @IsNotEmpty()
  exam: ExamList;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  statement: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  feedback?: string;
}
