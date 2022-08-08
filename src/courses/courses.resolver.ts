import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CoursesService } from './courses.service';
import { Course } from './entities/course.entity';
import { CreateCourseInput } from './dto/create-course.input';
import { UpdateCourseInput } from './dto/update-course.input';
import { UseGuards, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AdminAuthGuard } from 'src/auth/guards/admin-role.guard';
import { CourseByIdPipe } from './pipes/course-by-id.pipe';

@Resolver(() => Course)
export class CoursesResolver {
  constructor(private readonly coursesService: CoursesService) {}

  @UseGuards(AdminAuthGuard)
  @Mutation(() => Course, { name: 'createCourse' })
  createCourse(
    @Args('createCourseInput', new ValidationPipe())
    createCourseInput: CreateCourseInput,
  ) {
    return this.coursesService.create(createCourseInput);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Course], { name: 'findAllCourses' })
  findAll() {
    return this.coursesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Course, { name: 'findCourseByID' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.coursesService.findOne(id);
  }

  @UseGuards(AdminAuthGuard)
  @Mutation(() => Course, { name: 'updateCourse' })
  updateCourse(
    @Args('updateCourseInput', new ValidationPipe())
    updateCourseInput: UpdateCourseInput,
    @Args('course_id', { type: () => Int }, CourseByIdPipe) course: Course,
  ) {
    return this.coursesService.update(course, updateCourseInput);
  }

  @UseGuards(AdminAuthGuard)
  @Mutation(() => Course, { name: 'deleteCourse' })
  removeCourse(@Args('id', { type: () => Int }) id: number) {
    return this.coursesService.remove(id);
  }
}
