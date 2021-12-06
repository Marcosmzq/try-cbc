import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTriviaInput } from './dto/create-trivia.input';
import { UpdateTriviaInput } from './dto/update-trivia.input';
import { Trivia } from './entities/trivia.entity';

@Injectable()
export class TriviasService {
  constructor(
    @InjectRepository(Trivia)
    private readonly triviaRepository: Repository<Trivia>,
  ) {}

  create(createTriviaInput: CreateTriviaInput) {
    const trivia = this.triviaRepository.create(createTriviaInput);
    return this.triviaRepository.save(trivia);
  }

  findAll() {
    return this.triviaRepository.find({ relations: ['answers'] });
  }

  findOne(id: number) {
    return this.triviaRepository.findOne(id, { relations: ['answers'] });
  }

  triviaQuiz(subject: string, exam: string, limit?: number) {
    return this.triviaRepository
      .createQueryBuilder('trivia')
      .leftJoinAndSelect('trivia.answers', 'answers')
      .orderBy('RANDOM()')
      .where({ subject, exam })
      .limit(limit || 10)
      .getMany();
  }

  randomTrivia(subject: string, exam: string) {
    return this.triviaRepository
      .createQueryBuilder('trivia')
      .leftJoinAndSelect('trivia.answers', 'answers')
      .orderBy('RANDOM()')
      .where({ subject, exam })
      .getOne();
  }

  async update(id: number, updateTriviaInput: UpdateTriviaInput) {
    const { statement, exam, subject, feedback } = updateTriviaInput;
    const trivia = await this.triviaRepository.findOne(id);
    if (exam) trivia.exam = exam;
    if (subject) trivia.subject = subject;
    if (statement) trivia.statement = statement;
    if (feedback) trivia.feedback = feedback;

    return this.triviaRepository.save(trivia);
  }

  remove(id: number) {
    return this.triviaRepository.delete(id);
  }
}
