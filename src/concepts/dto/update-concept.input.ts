import { CreateConceptInput } from './create-concept.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateConceptInput extends PartialType(CreateConceptInput) {}
