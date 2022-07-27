import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TimelineEventsService } from './timeline-events.service';
import { TimelineEvent } from './entities/timeline-event.entity';
import { CreateTimelineEventInput } from './dto/create-timeline-event.input';
import { UpdateTimelineEventInput } from './dto/update-timeline-event.input';

@Resolver(() => TimelineEvent)
export class TimelineEventsResolver {
  constructor(private readonly timelineEventsService: TimelineEventsService) {}

  @Mutation(() => TimelineEvent)
  createTimelineEvent(@Args('createTimelineEventInput') createTimelineEventInput: CreateTimelineEventInput) {
    return this.timelineEventsService.create(createTimelineEventInput);
  }

  @Query(() => [TimelineEvent], { name: 'timelineEvents' })
  findAll() {
    return this.timelineEventsService.findAll();
  }

  @Query(() => TimelineEvent, { name: 'timelineEvent' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.timelineEventsService.findOne(id);
  }

  @Mutation(() => TimelineEvent)
  updateTimelineEvent(@Args('updateTimelineEventInput') updateTimelineEventInput: UpdateTimelineEventInput) {
    return this.timelineEventsService.update(updateTimelineEventInput.id, updateTimelineEventInput);
  }

  @Mutation(() => TimelineEvent)
  removeTimelineEvent(@Args('id', { type: () => Int }) id: number) {
    return this.timelineEventsService.remove(id);
  }
}
