import { CreateTimelineEventInput } from './create-timeline-event.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTimelineEventInput extends PartialType(CreateTimelineEventInput) {
  @Field(() => Int)
  id: number;
}
