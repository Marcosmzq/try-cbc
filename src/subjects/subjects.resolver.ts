import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SubjectsService } from './subjects.service';
import { Subject } from './entities/subject.entity';
import { CreateSubjectInput } from './dto/create-subject.input';
import { UpdateSubjectInput } from './dto/update-subject.input';
import { ValidationPipe } from '@nestjs/common';

@Resolver(() => Subject)
export class SubjectsResolver {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Mutation(() => Subject, { name: 'createSubject' })
  createSubject(
    @Args('createSubjectInput', new ValidationPipe())
    createSubjectInput: CreateSubjectInput,
  ) {
    return this.subjectsService.create(createSubjectInput);
  }

  @Query(() => [Subject], { name: 'findAllSubjects' })
  findAll() {
    return this.subjectsService.findAll();
  }

  @Query(() => Subject, { name: 'findSubjectByID' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.subjectsService.findOne(id);
  }

  @Mutation(() => Subject, { name: 'updateSubject' })
  updateSubject(
    @Args('updateSubjectInput', new ValidationPipe())
    updateSubjectInput: UpdateSubjectInput,
  ) {
    return this.subjectsService.update(
      updateSubjectInput.id,
      updateSubjectInput,
    );
  }

  @Mutation(() => Subject, { name: 'deleteSubject' })
  removeSubject(@Args('id', { type: () => Int }) id: number) {
    return this.subjectsService.remove(id);
  }
}
