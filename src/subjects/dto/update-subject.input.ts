import { CreateSubjectInput } from './create-subject.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSubjectInput extends PartialType(CreateSubjectInput) {
  @Field(() => Int)
  id: number;
}
