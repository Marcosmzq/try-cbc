import { CreateTriviaInput } from './create-trivia.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTriviaInput extends PartialType(CreateTriviaInput) {}
