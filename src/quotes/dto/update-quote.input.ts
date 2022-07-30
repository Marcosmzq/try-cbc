import { CreateQuoteInput } from './create-quote.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateQuoteInput extends PartialType(CreateQuoteInput) {}
