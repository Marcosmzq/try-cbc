import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CoursesService } from './courses.service';
import { Course } from './entities/course.entity';
import { CreateCourseInput } from './dto/create-course.input';
import { UpdateCourseInput } from './dto/update-course.input';
import { UseGuards, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver(() => Course)
export class CoursesResolver {
  constructor(private readonly coursesService: CoursesService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Course, { name: 'createCourse' })
  createCourse(
    @Args('createCourseInput', new ValidationPipe())
    createCourseInput: CreateCourseInput,
  ) {
    return this.coursesService.create(createCourseInput);
  }

  @Query(() => [Course], { name: 'findAllCourses' })
  findAll() {
    return this.coursesService.findAll();
  }

  @Query(() => Course, { name: 'findCourseByID' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.coursesService.findOne(id);
  }

  @Mutation(() => Course, { name: 'updateCourse' })
  updateCourse(
    @Args('updateCourseInput', new ValidationPipe())
    updateCourseInput: UpdateCourseInput,
  ) {
    return this.coursesService.update(updateCourseInput.id, updateCourseInput);
  }

  @Mutation(() => Course, { name: 'deleteCourse' })
  removeCourse(@Args('id', { type: () => Int }) id: number) {
    return this.coursesService.remove(id);
  }
}
