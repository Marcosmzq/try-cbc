import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ExamList } from '../enums/examList.enum';
import { SubjectList } from '../enums/subjectList.enum';

@InputType()
export class CreateTriviaInput {
  @Field(() => SubjectList)
  @IsNotEmpty()
  subject: SubjectList;

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
