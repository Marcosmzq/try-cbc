import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/courses/entities/course.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateTimelineInput } from './dto/create-timeline.input';
import { UpdateTimelineInput } from './dto/update-timeline.input';
import { Timeline } from './entities/timeline.entity';

@Injectable()
export class TimelinesService {
  constructor(
    @InjectRepository(Timeline)
    private readonly timelineRepository: Repository<Timeline>,
  ) {}

  async create(
    user: User,
    course: Course,
    createTimelineInput: CreateTimelineInput,
  ) {
    const { title, description } = createTimelineInput;
    const newTimeline = this.timelineRepository.create({
      title,
      description,
      user,
      course,
    });
    return this.timelineRepository.save(newTimeline);
  }

  findAll() {
    return this.timelineRepository.find();
  }

  findOne(id: number) {
    return this.timelineRepository.findOne(id);
  }

  findByUser(user_id: number) {
    return this.timelineRepository.find({ user: { id: user_id } });
  }

  findCurrentUserTimelinesByCourse(currentUser: User, course: Course) {
    return this.timelineRepository.find({
      where: {
        user: currentUser,
        course,
      },
    });
  }

  async update(timeline: Timeline, updateTimelineInput: UpdateTimelineInput) {
    const { description, title } = updateTimelineInput;
    if (title) timeline.title = title;
    if (description) timeline.description = description;
    return this.timelineRepository.save(timeline);
  }

  remove(id: number) {
    return this.timelineRepository.delete(id);
  }
}
