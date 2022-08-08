import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseInput } from './dto/create-course.input';
import { UpdateCourseInput } from './dto/update-course.input';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  create(createCourseInput: CreateCourseInput) {
    const newCourse = this.courseRepository.create(createCourseInput);
    return this.courseRepository.save(newCourse);
  }

  findAll() {
    return this.courseRepository.find();
  }

  findOne(id: number) {
    return this.courseRepository.findOne(id);
  }

  async update(course, updateCourseInput: UpdateCourseInput) {
    const { isPremium, name } = updateCourseInput;
    if (isPremium !== undefined) course.isPremium = isPremium;
    if (name) course.name = name;
    return this.courseRepository.save(course);
  }

  remove(id: number) {
    return this.courseRepository.delete(id);
  }
}
