import { InputType, Field } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateSubjectInput {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  name: string;

  @IsBoolean()
  @Field(() => Boolean)
  isPremium: boolean;
}
