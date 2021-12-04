import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trivia } from '../entities/trivia.entity';
import { CreateAnswerInput } from './dto/create-answer.input';
import { UpdateAnswerInput } from './dto/update-answer.input';
import { Answer } from './entities/answer.entity';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(Trivia)
    private readonly triviaRepository: Repository<Trivia>,
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
  ) {}

  async create(createAnswerInput: CreateAnswerInput) {
    const { statement, isTrue, type, trivia_id } = createAnswerInput;
    const trivia = await this.triviaRepository.findOne(trivia_id);
    const answer = this.answerRepository.create({
      statement,
      isTrue,
      type,
      trivia,
    });

    return this.answerRepository.save(answer);
  }

  findAll() {
    return this.answerRepository.find();
  }

  findOne(id: number) {
    return this.answerRepository.findOne(id);
  }

  async update(id: number, updateAnswerInput: UpdateAnswerInput) {
    const { statement, type, isTrue } = updateAnswerInput;
    const answer = await this.answerRepository.findOne(id);

    if (statement) answer.statement = statement;
    if (type) answer.type = type;
    if (isTrue !== undefined) answer.isTrue = isTrue;
    return this.answerRepository.save(answer);
  }

  remove(id: number) {
    return this.answerRepository.delete(id);
  }
}
