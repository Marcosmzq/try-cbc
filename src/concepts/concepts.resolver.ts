import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ConceptsService } from './concepts.service';
import { Concept } from './entities/concept.entity';
import { CreateConceptInput } from './dto/create-concept.input';
import { UpdateConceptInput } from './dto/update-concept.input';
import { Body, UseGuards, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ConceptsCrudOpsGuard } from './guards/concepts-crud-ops.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { AdminAuthGuard } from 'src/auth/guards/admin-role.guard';
import { CourseByIdPipe } from 'src/courses/pipes/course-by-id.pipe';
import { Course } from 'src/courses/entities/course.entity';
import { ConceptByIdPipe } from './pipes/concept-by-id.pipe';

@Resolver(() => Concept)
export class ConceptsResolver {
  constructor(private readonly conceptsService: ConceptsService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Concept, { name: 'createConcept' })
  createConcept(
    @Args('createConceptInput', new ValidationPipe())
    createConceptInput: CreateConceptInput,
    @Args('course_id', { type: () => Int }, CourseByIdPipe)
    course: Course,
    @CurrentUser()
    currentUser: User,
  ) {
    return this.conceptsService.create(currentUser, course, createConceptInput);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Concept], { name: 'findCurrentUserConceptsByCourse' })
  findCurrentUserConceptsByCourse(
    @Args('course_id', { type: () => Int }, CourseByIdPipe) course: Course,
    @CurrentUser() currentUser: User,
  ) {
    return this.conceptsService.findCurrentUserConceptsByCourse(
      currentUser,
      course,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Concept, { name: 'findCurrentUserRandomConceptByCourse' })
  findCurrentUserRandomConceptByCourse(
    @Args('course_id', { type: () => Int }, CourseByIdPipe) course: Course,
    @CurrentUser() currentUser: User,
  ) {
    return this.conceptsService.findCurrentUserRandomConceptByCourse(
      currentUser,
      course,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Concept, { name: 'findAdminConceptsByCourse' })
  findAdminConceptsByCourse(
    @Args('course_id', { type: () => Int }) course_id: number,
  ) {
    return this.conceptsService.findAllAdminConceptsByCourse(course_id);
  }

  @UseGuards(AdminAuthGuard)
  @Query(() => [Concept], { name: 'findAllConcepts' })
  findAll() {
    return this.conceptsService.findAll();
  }

  @UseGuards(ConceptsCrudOpsGuard)
  @Query(() => Concept, { name: 'findConceptById' })
  findOne(@Args('trivia_id', { type: () => Int }) trivia_id: number) {
    return this.conceptsService.findOne(trivia_id);
  }

  @UseGuards(AdminAuthGuard)
  @Query(() => [Concept], { name: 'findConceptsByAuthor' })
  findByAuthor(@Args('author_id', { type: () => Int }) author_id: number) {
    return this.conceptsService.findByAuthor(author_id);
  }

  @UseGuards(AdminAuthGuard)
  @Query(() => [Concept], { name: 'findConceptsByCourse' })
  findByCourse(@Args('course_id', { type: () => Int }) course_id: number) {
    return this.conceptsService.findByCourse(course_id);
  }

  @UseGuards(JwtAuthGuard, ConceptsCrudOpsGuard)
  @Mutation(() => Concept, { name: 'updateConcept' })
  updateConcept(
    @Args('concept_id', { type: () => Int }, ConceptByIdPipe) concept: Concept,
    @Args('updateConceptInput', new ValidationPipe())
    updateConceptInput: UpdateConceptInput,
  ) {
    return this.conceptsService.update(concept, updateConceptInput);
  }

  @UseGuards(JwtAuthGuard, ConceptsCrudOpsGuard)
  @Mutation(() => Concept, { name: 'deleteConcept' })
  removeConcept(@Args('concept_id', { type: () => Int }) concept_id: number) {
    return this.conceptsService.remove(concept_id);
  }
}
