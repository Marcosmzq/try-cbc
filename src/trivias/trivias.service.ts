import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from 'src/subjects/entities/subject.entity';
import { Repository } from 'typeorm';
import { CreateTriviaInput } from './dto/create-trivia.input';
import { UpdateTriviaInput } from './dto/update-trivia.input';
import { Trivia } from './entities/trivia.entity';
import { TriviaType } from './enums/triviaType.enum';

@Injectable()
export class TriviasService {
  constructor(
    @InjectRepository(Trivia)
    private readonly triviaRepository: Repository<Trivia>,
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
  ) {}

  async create(createTriviaInput: CreateTriviaInput) {
    const { statement, exam, subject_id, feedback, type, source } =
      createTriviaInput;
    const subject = await this.subjectRepository.findOne(subject_id);
    const trivia = this.triviaRepository.create({
      statement,
      exam,
      feedback,
      subject,
      type,
      source,
    });
    return this.triviaRepository.save(trivia);
  }

  findAll() {
    return this.triviaRepository.find({ relations: ['answers'] });
  }

  findOne(id: number) {
    return this.triviaRepository.findOne(id, { relations: ['answers'] });
  }

  async randomTrivia(subject_id: number, exam: string, type: TriviaType) {
    const subject = await this.subjectRepository.findOne(subject_id);
    return this.triviaRepository
      .createQueryBuilder('trivia')
      .leftJoinAndSelect('trivia.answers', 'answers')
      .leftJoinAndSelect('trivia.subject', 'subject')
      .orderBy('RANDOM()')
      .where({ subject, type, ...(exam && { exam }) })
      .getOne();
  }

  async update(id: number, updateTriviaInput: UpdateTriviaInput) {
    const { statement, exam, subject_id, feedback, type, source } =
      updateTriviaInput;
    const trivia = await this.triviaRepository.findOne(id);
    if (type) trivia.type = type;
    if (exam) trivia.exam = exam;
    if (statement) trivia.statement = statement;
    if (feedback) trivia.feedback = feedback;
    if (source) trivia.source = source;
    if (subject_id) {
      const newSubject = await this.subjectRepository.findOne(subject_id);
      trivia.subject = newSubject;
    }

    return this.triviaRepository.save(trivia);
  }

  remove(id: number) {
    return this.triviaRepository.delete(id);
  }
}
