import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInputError } from 'apollo-server-express';
import { Trivia } from 'src/trivias/entities/trivia.entity';
import { Repository } from 'typeorm';
import { CreateTriviasAnswerInput } from './dto/create-trivias-answer.input';
import { UpdateTriviasAnswerInput } from './dto/update-trivias-answer.input';
import { TriviasAnswer } from './entities/trivias-answer.entity';

@Injectable()
export class TriviasAnswersService {
  constructor(
    @InjectRepository(Trivia)
    private readonly triviaRepository: Repository<Trivia>,
    @InjectRepository(TriviasAnswer)
    private readonly triviasAnswerRepository: Repository<TriviasAnswer>,
  ) {}

  async create(createTriviasAnswerInput: CreateTriviasAnswerInput) {
    const { statement, isTrue, trivia_id } = createTriviasAnswerInput;
    const trivia = await this.triviaRepository.findOne(trivia_id);
    if (!trivia)
      throw new UserInputError(
        'The trivia id entered not belongs to any trivia.',
      );
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

  async update(id: number, updateTriviasAnswerInput: UpdateTriviasAnswerInput) {
    const { statement, isTrue } = updateTriviasAnswerInput;
    const answer = await this.triviasAnswerRepository.findOne(id);
    if (!answer)
      throw new UserInputError(
        'The trivia answer id entered not belongs to any answer.',
      );
    if (statement) answer.statement = statement;
    if (isTrue !== undefined) answer.isTrue = isTrue;
    return this.triviasAnswerRepository.save(answer);
  }

  remove(id: number) {
    return this.triviasAnswerRepository.delete(id);
  }
}
