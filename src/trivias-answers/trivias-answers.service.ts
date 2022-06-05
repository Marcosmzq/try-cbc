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
    @InjectRepository(Trivia)
    private readonly triviaRepository: Repository<Trivia>,
    @InjectRepository(TriviasAnswer)
    private readonly triviasAnswerRepository: Repository<TriviasAnswer>,
  ) {}

  async create(createTriviasAnswerInput: CreateTriviasAnswerInput) {
    const { statement, isTrue, type, trivia_id } = createTriviasAnswerInput;
    const trivia = await this.triviaRepository.findOne(trivia_id);
    const answer = this.triviasAnswerRepository.create({
      statement,
      isTrue,
      type,
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
    const { statement, type, isTrue } = updateTriviasAnswerInput;
    const answer = await this.triviasAnswerRepository.findOne(id);

    if (statement) answer.statement = statement;
    if (type) answer.type = type;
    if (isTrue !== undefined) answer.isTrue = isTrue;
    return this.triviasAnswerRepository.save(answer);
  }

  remove(id: number) {
    return this.triviasAnswerRepository.delete(id);
  }
}
