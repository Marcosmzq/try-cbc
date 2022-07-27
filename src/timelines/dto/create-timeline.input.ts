import { InputType, Int, Field } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateTimelineInput {
  @IsInt()
  @IsNotEmpty()
  @Field(() => Int)
  user_id: number;

  @IsInt()
  @IsNotEmpty()
  @Field(() => Int)
  course_id: number;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  title: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  description: string;
}
