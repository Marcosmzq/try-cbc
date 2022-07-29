import { PipeTransform, Injectable } from '@nestjs/common';
import { UserInputError } from 'apollo-server-express';
import { CoursesService } from '../courses.service';

@Injectable()
export class CourseByIdPipe implements PipeTransform {
  constructor(private readonly coursesService: CoursesService) {}

  async transform(value: any) {
    const course = await this.coursesService.findOne(value);
    if (!course)
      throw new UserInputError(
        'The course id provided is wrong, try with other.',
      );
    return course;
  }
}
