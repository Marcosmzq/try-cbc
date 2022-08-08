import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateTimelineInput {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  title: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  description: string;
}
