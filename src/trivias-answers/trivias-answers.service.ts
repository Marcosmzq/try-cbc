import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Trivia } from 'src/trivias/entities/trivia.entity';
import { Repository } from 'typeorm';
import { CreateTriviasAnswerInput } from './dto/create-trivias-answer.input';
import { UpdateTriviasAnswerInput } from './dto/update-trivias-answer.input';
import { TriviasAnswer } from './entities/trivias-answer.entity';

@Injectable()
export class TriviasAnswersService {
  constructor(
    @InjectRepository(TriviasAnswer)
    private readonly triviasAnswerRepository: Repository<TriviasAnswer>,
  ) {}

  async create(
    trivia: Trivia,
    createTriviasAnswerInput: CreateTriviasAnswerInput,
  ) {
    const { statement, isTrue } = createTriviasAnswerInput;
    const answer = this.triviasAnswerRepository.create({
      statement,
      isTrue,
      trivia,
    });

    return this.triviasAnswerRepository.save(answer);
  }

  findAll() {
    return this.triviasAnswerRepository.find();
  }

  findOne(id: number) {
    return this.triviasAnswerRepository.findOne(id);
  }

  async update(
    answer: TriviasAnswer,
    updateTriviasAnswerInput: UpdateTriviasAnswerInput,
  ) {
    const { statement, isTrue } = updateTriviasAnswerInput;
    if (statement) answer.statement = statement;
    if (isTrue !== undefined) answer.isTrue = isTrue;
    return this.triviasAnswerRepository.save(answer);
  }

  remove(id: number) {
    return this.triviasAnswerRepository.delete(id);
  }
}
