import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TriviasAnswersService } from './trivias-answers.service';
import { TriviasAnswer } from './entities/trivias-answer.entity';
import { CreateTriviasAnswerInput } from './dto/create-trivias-answer.input';
import { UpdateTriviasAnswerInput } from './dto/update-trivias-answer.input';
import { Roles } from 'src/docorators/roles.decorator';
import { UserRole } from 'src/users/enums/userRole.enum';
import { ValidationPipe } from '@nestjs/common';

@Resolver(() => TriviasAnswer)
export class TriviasAnswersResolver {
  constructor(private readonly triviasAnswersService: TriviasAnswersService) {}

  @Mutation(() => TriviasAnswer, { name: 'createTriviaAnswer' })
  @Roles(UserRole.ADMIN)
  createTriviasAnswer(
    @Args('createTriviasAnswerInput', new ValidationPipe())
    createTriviasAnswerInput: CreateTriviasAnswerInput,
  ) {
    return this.triviasAnswersService.create(createTriviasAnswerInput);
  }

  @Query(() => [TriviasAnswer], { name: 'findAllTriviasAnswers' })
  @Roles(UserRole.ADMIN)
  findAll() {
    return this.triviasAnswersService.findAll();
  }

  @Query(() => TriviasAnswer, { name: 'findTriviasAnswerByID' })
  @Roles(UserRole.ADMIN)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.triviasAnswersService.findOne(id);
  }

  @Mutation(() => TriviasAnswer, { name: 'updateTriviaAnswer' })
  @Roles(UserRole.ADMIN)
  updateTriviasAnswer(
    @Args('updateTriviasAnswerInput', new ValidationPipe())
    updateTriviasAnswerInput: UpdateTriviasAnswerInput,
  ) {
    return this.triviasAnswersService.update(
      updateTriviasAnswerInput.id,
      updateTriviasAnswerInput,
    );
  }

  @Mutation(() => TriviasAnswer, { name: 'deleteTriviaAnswer' })
  @Roles(UserRole.ADMIN)
  removeTriviasAnswer(@Args('id', { type: () => Int }) id: number) {
    return this.triviasAnswersService.remove(id);
  }
}
