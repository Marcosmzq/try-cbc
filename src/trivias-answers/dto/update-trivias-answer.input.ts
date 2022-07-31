import { CreateTriviasAnswerInput } from './create-trivias-answer.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTriviasAnswerInput extends PartialType(
  CreateTriviasAnswerInput,
) {}
