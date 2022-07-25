import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsOptional, IsInt,IsBoolean } from 'class-validator';
import { ExamList } from '../enums/examList.enum';

@InputType()
export class CreateTriviaInput {
  @IsInt()
  @IsNotEmpty()
  @Field(() => Int)
  course_id: number;

  @Field(() => Boolean)
  @IsBoolean()
  isTrivia: boolean
    
  @Field(() => Boolean)
  @IsBoolean()
  isFlashcard: boolean

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
