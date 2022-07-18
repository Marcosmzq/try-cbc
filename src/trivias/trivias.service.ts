import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInputError } from 'apollo-server-errors';
import { Course } from 'src/courses/entities/course.entity';
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
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) { }

  async create(createTriviaInput: CreateTriviaInput) {
    const { statement, exam, course_id, feedback, type, source } =
      createTriviaInput;
    const course = await this.courseRepository.findOne(course_id);
    if (!course) throw new UserInputError("The course not exist, try with other course_id.")
    const trivia = this.triviaRepository.create({
      statement,
      exam,
      feedback, 
      course,
      type,
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

  async randomTrivia(course_id: number, exam: string, type: TriviaType) {
    const course = await this.courseRepository.findOne(course_id);
    return this.triviaRepository
      .createQueryBuilder('trivia')
      .leftJoinAndSelect('trivia.answers', 'answers')
      .leftJoinAndSelect('trivia.course', 'course')
      .orderBy('RANDOM()')
      .where({ course, type, ...(exam && { exam }) })
      .getOne();
  }

  async update(id: number, updateTriviaInput: UpdateTriviaInput) {
    const { statement, exam, course_id, feedback, type, source } =
      updateTriviaInput;
    const trivia = await this.triviaRepository.findOne(id);
    if(!trivia) throw new UserInputError('The trivia not exist.')
    if (type) trivia.type = type;
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
}
