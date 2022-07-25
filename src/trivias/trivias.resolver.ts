import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TriviasService } from './trivias.service';
import { Trivia } from './entities/trivia.entity';
import { CreateTriviaInput } from './dto/create-trivia.input';
import { UpdateTriviaInput } from './dto/update-trivia.input';
import { ExamList } from './enums/examList.enum';
import { Roles } from 'src/docorators/roles.decorator';
import { UserRole } from 'src/users/enums/userRole.enum';
import { UseGuards, ValidationPipe } from '@nestjs/common';
import { PremiumTriviasGuard } from './guards/premium-trivias.guard';

@Resolver(() => Trivia)
export class TriviasResolver {
  constructor(private readonly triviasService: TriviasService) {}

  @Mutation(() => Trivia, { name: 'createTrivia' })
  @Roles(UserRole.ADMIN)
  createTrivia(
    @Args('createTriviaInput', new ValidationPipe())
    createTriviaInput: CreateTriviaInput,
  ) {
    return this.triviasService.create(createTriviaInput);
  }

  @Query(() => [Trivia], { name: 'findAllTrivias' })
  @Roles(UserRole.ADMIN)
  findAll() {
    return this.triviasService.findAll();
  }

  @Query(() => Trivia, { name: 'findTriviaByID' })
  @Roles(UserRole.ADMIN)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.triviasService.findOne(id);
  }

  @Query(() => Trivia, { name: 'getRandomTriviaByParams' })
  @UseGuards(PremiumTriviasGuard)
  getRandomTrivia(
    @Args('subject_id', { type: () => Int }) subject_id: number,
    @Args('isTrivia', {type: () => Boolean}) isTrivia: boolean,
    @Args('exam', { type: () => ExamList, nullable: true }) exam: ExamList,
  ) {
    return this.triviasService.getRandomTrivia(subject_id, exam, isTrivia);
  }

  @Mutation(() => Trivia, { name: 'updateTrivia' })
  @Roles(UserRole.ADMIN)
  updateTrivia(
    @Args('updateTriviaInput', new ValidationPipe())
    updateTriviaInput: UpdateTriviaInput,
  ) {
    return this.triviasService.update(updateTriviaInput.id, updateTriviaInput);
  }

  @Mutation(() => Trivia, { name: 'deleteTrivia' })
  @Roles(UserRole.ADMIN)
  removeTrivia(@Args('id', { type: () => Int }) id: number) {
    return this.triviasService.remove(id);
  }
}
