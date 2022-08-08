import { CreateTimelineInput } from './create-timeline.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTimelineInput extends PartialType(CreateTimelineInput) {}
