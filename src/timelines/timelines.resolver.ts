import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TimelinesService } from './timelines.service';
import { Timeline } from './entities/timeline.entity';
import { CreateTimelineInput } from './dto/create-timeline.input';
import { UpdateTimelineInput } from './dto/update-timeline.input';

@Resolver(() => Timeline)
export class TimelinesResolver {
  constructor(private readonly timelinesService: TimelinesService) {}

  @Mutation(() => Timeline, { name: 'createTimeline' })
  createTimeline(
    @Args('createTimelineInput') createTimelineInput: CreateTimelineInput,
  ) {
    return this.timelinesService.create(createTimelineInput);
  }

  @Query(() => [Timeline], { name: 'findAllTimelines' })
  findAll() {
    return this.timelinesService.findAll();
  }

  @Query(() => Timeline, { name: 'findTimelineById' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.timelinesService.findOne(id);
  }

  @Mutation(() => Timeline, { name: 'updateTimeline' })
  updateTimeline(
    @Args('updateTimelineInput') updateTimelineInput: UpdateTimelineInput,
  ) {
    return this.timelinesService.update(
      updateTimelineInput.id,
      updateTimelineInput,
    );
  }

  @Mutation(() => Timeline, { name: 'deleteTimeline' })
  removeTimeline(@Args('id', { type: () => Int }) id: number) {
    return this.timelinesService.remove(id);
  }
}
