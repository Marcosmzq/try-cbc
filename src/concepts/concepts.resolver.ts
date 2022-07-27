import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ConceptsService } from './concepts.service';
import { Concept } from './entities/concept.entity';
import { CreateConceptInput } from './dto/create-concept.input';
import { UpdateConceptInput } from './dto/update-concept.input';
import { ValidationPipe } from '@nestjs/common';

@Resolver(() => Concept)
export class ConceptsResolver {
  constructor(private readonly conceptsService: ConceptsService) {}

  @Mutation(() => Concept, { name: 'createConcept' })
  createConcept(
    @Args('createConceptInput', new ValidationPipe())
    createConceptInput: CreateConceptInput,
  ) {
    return this.conceptsService.create(createConceptInput);
  }

  @Query(() => [Concept], { name: 'findAllConcepts' })
  findAll() {
    return this.conceptsService.findAll();
  }

  @Query(() => Concept, { name: 'findConceptById' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.conceptsService.findOne(id);
  }

  @Query(() => [Concept], { name: 'findConceptsByAuthor' })
  findByAuthor(@Args('author_id', { type: () => Int }) author_id: number) {
    return this.conceptsService.findByAuthor(author_id);
  }

  @Query(() => [Concept], { name: 'findConceptsByCourse' })
  findByCourse(@Args('course_id', { type: () => Int }) course_id: number) {
    return this.conceptsService.findByCourse(course_id);
  }

  @Mutation(() => Concept, { name: 'updateConcept' })
  updateConcept(
    @Args('updateConceptInput', new ValidationPipe())
    updateConceptInput: UpdateConceptInput,
  ) {
    return this.conceptsService.update(
      updateConceptInput.id,
      updateConceptInput,
    );
  }

  @Mutation(() => Concept, { name: 'deleteConcept' })
  removeConcept(@Args('id', { type: () => Int }) id: number) {
    return this.conceptsService.remove(id);
  }
}
