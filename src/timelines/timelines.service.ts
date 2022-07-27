import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInputError } from 'apollo-server-express';
import { CoursesService } from 'src/courses/courses.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateTimelineInput } from './dto/create-timeline.input';
import { UpdateTimelineInput } from './dto/update-timeline.input';
import { Timeline } from './entities/timeline.entity';

@Injectable()
export class TimelinesService {
  constructor(
    @InjectRepository(Timeline)
    private readonly timelineRepository: Repository<Timeline>,
    private readonly usersService: UsersService,
    private readonly coursesService: CoursesService,
  ) {}

  async create(createTimelineInput: CreateTimelineInput) {
    const { user_id, course_id, title, description } = createTimelineInput;
    const user = await this.usersService.findOne(user_id);
    if (!user)
      throw new UserInputError(
        'The author id passed not belongs to any user. Try with other.',
      );
    const course = await this.coursesService.findOne(course_id);
    if (!course)
      throw new UserInputError(
        'The course id passed is not valid. Try with other.',
      );
    const newNote = this.timelineRepository.create({
      title,
      description,
      user,
      course,
    });
    return this.timelineRepository.save(newNote);
  }

  findAll() {
    return this.timelineRepository.find();
  }

  findOne(id: number) {
    return this.timelineRepository.findOne(id);
  }

  findByUser(user_id) {
    return this.timelineRepository.find({ user: { id: user_id } });
  }

  async update(timeline_id: number, updateTimelineInput: UpdateTimelineInput) {
    const { user_id, course_id, description, title } = updateTimelineInput;
    const timeline = await this.timelineRepository.findOne(timeline_id);
    if (user_id) {
      const updatedAuthor = await this.usersService.findOne(user_id);
      if (!updatedAuthor)
        throw new UserInputError(
          'The author id passed not belongs to any user. Try with other.',
        );
      timeline.user = updatedAuthor;
    }
    if (course_id) {
      const updatedCourse = await this.coursesService.findOne(course_id);
      if (!updatedCourse)
        throw new UserInputError(
          'The course id passed not belongs to any course. Try with other.',
        );
      timeline.course = updatedCourse;
    }
    if (title) timeline.title = title;
    if (description) timeline.description = description;
    return this.timelineRepository.save(timeline);
  }

  remove(id: number) {
    return this.timelineRepository.delete(id);
  }
}
