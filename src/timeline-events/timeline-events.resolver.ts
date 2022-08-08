import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TimelineEventsService } from './timeline-events.service';
import { TimelineEvent } from './entities/timeline-event.entity';
import { CreateTimelineEventInput } from './dto/create-timeline-event.input';
import { UpdateTimelineEventInput } from './dto/update-timeline-event.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { TimelineByIdPipe } from 'src/timelines/pipes/timeline-by-id.pipe';
import { Timeline } from 'src/timelines/entities/timeline.entity';
import { TimelineEventsCrudOpsGuard } from './guards/timeline-event-crud-ops.guard';
import { AdminAuthGuard } from 'src/auth/guards/admin-role.guard';
import { TimelinesCrudOpsGuard } from 'src/timelines/guards/timeline-crud-ops.guard';
import { TimelineEventByIdPipe } from './pipes/timeline-event-by-id.pipe';

@Resolver(() => TimelineEvent)
export class TimelineEventsResolver {
  constructor(private readonly timelineEventsService: TimelineEventsService) {}

  @UseGuards(JwtAuthGuard, TimelinesCrudOpsGuard)
  @Mutation(() => TimelineEvent, { name: 'createTimelineEvent' })
  createTimelineEvent(
    @Args('timeline_id', { type: () => Int }, TimelineByIdPipe)
    timeline: Timeline,
    @Args('createTimelineEventInput')
    createTimelineEventInput: CreateTimelineEventInput,
  ) {
    return this.timelineEventsService.create(
      timeline,
      createTimelineEventInput,
    );
  }

  @UseGuards(AdminAuthGuard)
  @Query(() => [TimelineEvent], { name: 'findAllTimelineEvents' })
  findAll() {
    return this.timelineEventsService.findAll();
  }

  @UseGuards(JwtAuthGuard, TimelineEventsCrudOpsGuard)
  @Query(() => TimelineEvent, { name: 'findTimelineEventById' })
  findOne(
    @Args('timelineEvent_id', { type: () => Int }) timelineEvent_id: number,
  ) {
    return this.timelineEventsService.findOne(timelineEvent_id);
  }

  @UseGuards(JwtAuthGuard, TimelinesCrudOpsGuard)
  @Query(() => TimelineEvent, { name: 'findRandomTimelineEvent' })
  findRandom(
    @Args('timeline_id', { type: () => Int }, TimelineByIdPipe)
    timeline: Timeline,
  ) {
    return this.timelineEventsService.findRandomEventBTimeline(timeline);
  }

  @UseGuards(JwtAuthGuard, TimelinesCrudOpsGuard)
  @Query(() => TimelineEvent, { name: 'findTimelineEventsByTimeline' })
  findByTimeline(
    @Args('timeline_id', { type: () => Int }, TimelineByIdPipe)
    timeline: Timeline,
  ) {
    return this.timelineEventsService.findByTimeline(timeline);
  }

  @UseGuards(JwtAuthGuard, TimelineEventsCrudOpsGuard)
  @Mutation(() => TimelineEvent)
  updateTimelineEvent(
    @Args('timelineEvent_id', { type: () => Int }, TimelineEventByIdPipe)
    timelineEvent: TimelineEvent,
    @Args('updateTimelineEventInput')
    updateTimelineEventInput: UpdateTimelineEventInput,
  ) {
    return this.timelineEventsService.update(
      timelineEvent,
      updateTimelineEventInput,
    );
  }

  @UseGuards(JwtAuthGuard, TimelineEventsCrudOpsGuard)
  @Mutation(() => TimelineEvent)
  removeTimelineEvent(
    @Args('timelineEvent_id', { type: () => Int }) timelineEvent_id: number,
  ) {
    return this.timelineEventsService.remove(timelineEvent_id);
  }
}
