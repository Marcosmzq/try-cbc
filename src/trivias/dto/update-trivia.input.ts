import { CreateTriviaInput } from './create-trivia.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTriviaInput extends PartialType(CreateTriviaInput) {
  @Field(() => Int)
  id: number;
}
