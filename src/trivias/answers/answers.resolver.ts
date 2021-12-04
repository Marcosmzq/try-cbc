import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AnswersService } from './answers.service';
import { Answer } from './entities/answer.entity';
import { CreateAnswerInput } from './dto/create-answer.input';
import { UpdateAnswerInput } from './dto/update-answer.input';
import { Roles } from 'src/docorators/roles.decorator';
import { UserRole } from 'src/users/enums/userRole.enum';
import { ValidationPipe } from '@nestjs/common';

@Resolver(() => Answer)
export class AnswersResolver {
  constructor(private readonly answersService: AnswersService) {}

  @Mutation(() => Answer, { name: 'createAnswer' })
  @Roles(UserRole.ADMIN)
  createAnswer(
    @Args('createAnswerInput', new ValidationPipe())
    createAnswerInput: CreateAnswerInput,
  ) {
    return this.answersService.create(createAnswerInput);
  }

  @Query(() => [Answer], { name: 'findAllAnswers' })
  @Roles(UserRole.ADMIN)
  findAll() {
    return this.answersService.findAll();
  }

  @Query(() => Answer, { name: 'findAnswerByID' })
  @Roles(UserRole.ADMIN)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.answersService.findOne(id);
  }

  @Mutation(() => Answer, { name: 'updateAnswer' })
  @Roles(UserRole.ADMIN)
  updateAnswer(
    @Args('updateAnswerInput', new ValidationPipe())
    updateAnswerInput: UpdateAnswerInput,
  ) {
    return this.answersService.update(updateAnswerInput.id, updateAnswerInput);
  }

  @Mutation(() => Answer, { name: 'deleteAnswer' })
  @Roles(UserRole.ADMIN)
  removeAnswer(@Args('id', { type: () => Int }) id: number) {
    return this.answersService.remove(id);
  }
}
