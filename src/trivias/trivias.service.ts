import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInputError } from 'apollo-server-errors';
import { Course } from 'src/courses/entities/course.entity';
import { Repository } from 'typeorm';
import { CreateTriviaInput } from './dto/create-trivia.input';
import { UpdateTriviaInput } from './dto/update-trivia.input';
import { Trivia } from './entities/trivia.entity';

@Injectable()
export class TriviasService {
  constructor(
    @InjectRepository(Trivia)
    private readonly triviaRepository: Repository<Trivia>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) { }

  async create(createTriviaInput: CreateTriviaInput) {
    const { statement, exam, course_id, feedback,isTrivia, isFlashcard, source } =
      createTriviaInput;
    const course = await this.courseRepository.findOne(course_id);
    if (!course) throw new UserInputError("The course not exist, try with other course_id.")
    const trivia = this.triviaRepository.create({
      statement,
      exam,
      feedback, 
      course,
      isTrivia,
      isFlashcard,
      source,
      course_id,
    });
    return this.triviaRepository.save(trivia);
  }

  findAll() {
    return this.triviaRepository.find({ relations: ['answers'] });
  }

  findOne(id: number) {
    return this.triviaRepository.findOne(id, { relations: ['answers'] });
  }

  async update(id: number, updateTriviaInput: UpdateTriviaInput) {
    const { statement, exam, course_id, feedback, isTrivia, isFlashcard, source } =
      updateTriviaInput;
    const trivia = await this.triviaRepository.findOne(id);
    if(!trivia) throw new UserInputError('The trivia not exist.')
    if (isTrivia !== undefined) trivia.isTrivia = isTrivia;
    if (isFlashcard !== undefined) trivia.isFlashcard = isFlashcard;
    if (exam) trivia.exam = exam;
    if (statement) trivia.statement = statement;
    if (feedback) trivia.feedback = feedback;
    if (source) trivia.source = source;
    if (course_id) {
      const newCourse = await this.courseRepository.findOne(course_id);
      trivia.course = newCourse
      trivia.course_id = newCourse.id
    }

    return this.triviaRepository.save(trivia);
  }

  remove(id: number) {
    return this.triviaRepository.delete(id);
  }

  async getRandomTrivia(course_id: number, exam: string, isTrivia) {
      const course = await this.courseRepository.findOne(course_id);
      return this.triviaRepository
        .createQueryBuilder('trivia')
        .leftJoinAndSelect('trivia.answers', 'answers')
        .leftJoinAndSelect('trivia.course', 'course')
        .orderBy('RANDOM()')
        .where({ course, isTrivia, ...(exam && { exam }) })
        .getOne();
    }
  
  async getRandomFlashcard(course_id: number, exam: string, isFlashcard) {
      const course = await this.courseRepository.findOne(course_id);
      return this.triviaRepository
        .createQueryBuilder('trivia')
        .leftJoinAndSelect('trivia.answers', 'answers')
        .leftJoinAndSelect('trivia.course', 'course')
        .orderBy('RANDOM()')
        .where({ course, isFlashcard, ...(exam && { exam }) })
        .getOne();
    }

      async getManyRandomFlashcard(course_id: number, exam: string, isFlashcard) {
      const course = await this.courseRepository.findOne(course_id);
      return this.triviaRepository
        .createQueryBuilder('trivia')
        .leftJoinAndSelect('trivia.answers', 'answers')
        .leftJoinAndSelect('trivia.course', 'course')
        .orderBy('RANDOM()')
        .where({ course, isFlashcard, ...(exam && { exam }) })
        .limit(8)
        .getMany();
    }
}
