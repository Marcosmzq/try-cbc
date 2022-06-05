import { CreateTriviasAnswerInput } from './create-trivias-answer.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTriviasAnswerInput extends PartialType(CreateTriviasAnswerInput) {
  @Field(() => Int)
  id: number;
}
