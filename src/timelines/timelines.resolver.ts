import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TimelinesService } from './timelines.service';
import { Timeline } from './entities/timeline.entity';
import { CreateTimelineInput } from './dto/create-timeline.input';
import { UpdateTimelineInput } from './dto/update-timeline.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { Course } from 'src/courses/entities/course.entity';
import { CourseByIdPipe } from 'src/courses/pipes/course-by-id.pipe';
import { AdminAuthGuard } from 'src/auth/guards/admin-role.guard';
import { TimelinesCrudOpsGuard } from './guards/timeline-crud-ops.guard';
import { TimelineByIdPipe } from './pipes/timeline-by-id.pipe';

@Resolver(() => Timeline)
export class TimelinesResolver {
  constructor(private readonly timelinesService: TimelinesService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Timeline, { name: 'createTimeline' })
  createTimeline(
    @CurrentUser() currentUser: User,
    @Args('course_id', { type: () => Int }, CourseByIdPipe) course: Course,
    @Args('createTimelineInput') createTimelineInput: CreateTimelineInput,
  ) {
    return this.timelinesService.create(
      currentUser,
      course,
      createTimelineInput,
    );
  }

  @UseGuards(AdminAuthGuard)
  @Query(() => [Timeline], { name: 'findAllTimelines' })
  findAll() {
    return this.timelinesService.findAll();
  }

  @UseGuards(JwtAuthGuard, TimelinesCrudOpsGuard)
  @Query(() => Timeline, { name: 'findTimelineById' })
  findOne(@Args('timeline_id', { type: () => Int }) timeline_id: number) {
    return this.timelinesService.findOne(timeline_id);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Timeline], { name: 'findCurrentUserTimelinesByCourse' })
  findCurrentUserTimelinesByCourse(
    @CurrentUser() currentUser: User,
    @Args('course_id', { type: () => Int }, CourseByIdPipe) course: Course,
  ) {
    return this.timelinesService.findCurrentUserTimelinesByCourse(
      currentUser,
      course,
    );
  }

  @UseGuards(JwtAuthGuard, TimelinesCrudOpsGuard)
  @Mutation(() => Timeline, { name: 'updateTimeline' })
  updateTimeline(
    @Args('timeline_id', { type: () => Int }, TimelineByIdPipe)
    timeline: Timeline,
    @Args('updateTimelineInput') updateTimelineInput: UpdateTimelineInput,
  ) {
    return this.timelinesService.update(timeline, updateTimelineInput);
  }

  @UseGuards(JwtAuthGuard, TimelinesCrudOpsGuard)
  @Mutation(() => Timeline, { name: 'deleteTimeline' })
  removeTimeline(
    @Args('timeline_id', { type: () => Int }) timeline_id: number,
  ) {
    return this.timelinesService.remove(timeline_id);
  }
}
