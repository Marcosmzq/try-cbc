import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateQuoteInput {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  quoteAuthor: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  quoteContent: string;
}
