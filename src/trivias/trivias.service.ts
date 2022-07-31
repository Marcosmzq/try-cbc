import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/courses/entities/course.entity';
import { Repository } from 'typeorm';
import { CreateTriviaInput } from './dto/create-trivia.input';
import { UpdateTriviaInput } from './dto/update-trivia.input';
import { Trivia } from './entities/trivia.entity';
import { ExamList } from './enums/examList.enum';

@Injectable()
export class TriviasService {
  constructor(
    @InjectRepository(Trivia)
    private readonly triviaRepository: Repository<Trivia>,
  ) {}

  async create(course: Course, createTriviaInput: CreateTriviaInput) {
    const { statement, exam, feedback, isTrivia, isFlashcard } =
      createTriviaInput;
    const trivia = this.triviaRepository.create({
      statement,
      exam,
      feedback,
      course,
      isTrivia,
      isFlashcard,
    });
    return this.triviaRepository.save(trivia);
  }

  findAll() {
    return this.triviaRepository.find({ relations: ['answers'] });
  }

  findOne(id: number) {
    return this.triviaRepository.findOne(id, { relations: ['answers'] });
  }

  async update(trivia: Trivia, updateTriviaInput: UpdateTriviaInput) {
    const { statement, exam, feedback, isTrivia, isFlashcard } =
      updateTriviaInput;
    if (isTrivia !== undefined) trivia.isTrivia = isTrivia;
    if (isFlashcard !== undefined) trivia.isFlashcard = isFlashcard;
    if (exam) trivia.exam = exam;
    if (statement) trivia.statement = statement;
    if (feedback) trivia.feedback = feedback;

    return this.triviaRepository.save(trivia);
  }

  remove(id: number) {
    return this.triviaRepository.delete(id);
  }

  async getRandomTrivia(course: Course, exam: ExamList) {
    return this.triviaRepository
      .createQueryBuilder('trivia')
      .leftJoinAndSelect('trivia.answers', 'answers')
      .leftJoinAndSelect('trivia.course', 'course')
      .orderBy('RANDOM()')
      .where({ course, isTrivia: true, ...(exam && { exam }) })
      .getOne();
  }

  async getRandomFlashcard(course: Course, exam: string) {
    return this.triviaRepository
      .createQueryBuilder('trivia')
      .leftJoinAndSelect('trivia.answers', 'answers')
      .leftJoinAndSelect('trivia.course', 'course')
      .orderBy('RANDOM()')
      .where({ course, isFlashcard: true, ...(exam && { exam }) })
      .getOne();
  }
}
