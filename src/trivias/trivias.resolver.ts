import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TriviasService } from './trivias.service';
import { Trivia } from './entities/trivia.entity';
import { CreateTriviaInput } from './dto/create-trivia.input';
import { UpdateTriviaInput } from './dto/update-trivia.input';
import { ExamList } from './enums/examList.enum';
import { UseGuards, ValidationPipe } from '@nestjs/common';
import { AdminAuthGuard } from 'src/auth/guards/admin-role.guard';
import { CourseByIdPipe } from 'src/courses/pipes/course-by-id.pipe';
import { Course } from 'src/courses/entities/course.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { TriviaByIdPipe } from './pipes/trivia-by-id.pipe';
import { PremiumContentGuard } from 'src/auth/guards/premiun-content.guard';

@Resolver(() => Trivia)
export class TriviasResolver {
  constructor(private readonly triviasService: TriviasService) {}

  @UseGuards(AdminAuthGuard)
  @Mutation(() => Trivia, { name: 'createTrivia' })
  createTrivia(
    @Args('course_id', { type: () => Int }, CourseByIdPipe) course: Course,
    @Args('createTriviaInput', new ValidationPipe())
    createTriviaInput: CreateTriviaInput,
  ) {
    return this.triviasService.create(course, createTriviaInput);
  }

  @UseGuards(AdminAuthGuard)
  @Query(() => [Trivia], { name: 'findAllTrivias' })
  findAll() {
    return this.triviasService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Trivia, { name: 'findTriviaByID' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.triviasService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, PremiumContentGuard)
  @Query(() => Trivia, { name: 'getRandomTriviaByParams' })
  getRandomTrivia(
    @Args('course_id', { type: () => Int }, CourseByIdPipe) course: Course,
    @Args('exam', { type: () => ExamList, nullable: true }) exam: ExamList,
  ) {
    return this.triviasService.getRandomTrivia(course, exam);
  }

  @UseGuards(JwtAuthGuard, PremiumContentGuard)
  @Query(() => Trivia, { name: 'getRandomFlashcardByParams' })
  getRandomFlashcard(
    @Args('course_id', { type: () => Int }, CourseByIdPipe) course: Course,
    @Args('exam', { type: () => ExamList, nullable: true }) exam: ExamList,
  ) {
    return this.triviasService.getRandomFlashcard(course, exam);
  }

  @UseGuards(AdminAuthGuard)
  @Mutation(() => Trivia, { name: 'updateTrivia' })
  updateTrivia(
    @Args('trivia_id', { type: () => Int }, TriviaByIdPipe) trivia: Trivia,
    @Args('updateTriviaInput', new ValidationPipe())
    updateTriviaInput: UpdateTriviaInput,
  ) {
    return this.triviasService.update(trivia, updateTriviaInput);
  }

  @UseGuards(AdminAuthGuard)
  @Mutation(() => Trivia, { name: 'deleteTrivia' })
  removeTrivia(@Args('id', { type: () => Int }) id: number) {
    return this.triviasService.remove(id);
  }
}
