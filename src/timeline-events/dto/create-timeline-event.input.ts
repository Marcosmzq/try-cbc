import { InputType, Int, Field } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateTimelineEventInput {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  eventDate: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  eventTitle: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  eventContent: string;
}
