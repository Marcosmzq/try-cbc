import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TriviasAnswersService } from './trivias-answers.service';
import { TriviasAnswer } from './entities/trivias-answer.entity';
import { CreateTriviasAnswerInput } from './dto/create-trivias-answer.input';
import { UpdateTriviasAnswerInput } from './dto/update-trivias-answer.input';
import { UseGuards, ValidationPipe } from '@nestjs/common';
import { AdminAuthGuard } from 'src/auth/guards/admin-role.guard';
import { TriviaByIdPipe } from 'src/trivias/pipes/trivia-by-id.pipe';
import { Trivia } from 'src/trivias/entities/trivia.entity';
import { TriviaAnswerByIdPipe } from './pipes/trivia-answer-by-id.pipe';

@Resolver(() => TriviasAnswer)
export class TriviasAnswersResolver {
  constructor(private readonly triviasAnswersService: TriviasAnswersService) {}

  @UseGuards(AdminAuthGuard)
  @Mutation(() => TriviasAnswer, { name: 'createTriviaAnswer' })
  createTriviasAnswer(
    @Args('trivia_id', { type: () => Int }, TriviaByIdPipe) trivia: Trivia,
    @Args('createTriviasAnswerInput', new ValidationPipe())
    createTriviasAnswerInput: CreateTriviasAnswerInput,
  ) {
    return this.triviasAnswersService.create(trivia, createTriviasAnswerInput);
  }

  @UseGuards(AdminAuthGuard)
  @Query(() => [TriviasAnswer], { name: 'findAllTriviasAnswers' })
  findAll() {
    return this.triviasAnswersService.findAll();
  }

  @UseGuards(AdminAuthGuard)
  @Query(() => TriviasAnswer, { name: 'findTriviasAnswerByID' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.triviasAnswersService.findOne(id);
  }

  @UseGuards(AdminAuthGuard)
  @Mutation(() => TriviasAnswer, { name: 'updateTriviaAnswer' })
  updateTriviasAnswer(
    @Args('trivaAnswer_id', { type: () => Int }, TriviaAnswerByIdPipe)
    triviaAnswer: TriviasAnswer,
    @Args('updateTriviasAnswerInput', new ValidationPipe())
    updateTriviasAnswerInput: UpdateTriviasAnswerInput,
  ) {
    return this.triviasAnswersService.update(
      triviaAnswer,
      updateTriviasAnswerInput,
    );
  }

  @UseGuards(AdminAuthGuard)
  @Mutation(() => TriviasAnswer, { name: 'deleteTriviaAnswer' })
  removeTriviasAnswer(@Args('id', { type: () => Int }) id: number) {
    return this.triviasAnswersService.remove(id);
  }
}
