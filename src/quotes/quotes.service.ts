import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInputError } from 'apollo-server-express';
import { CoursesService } from 'src/courses/courses.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateQuoteInput } from './dto/create-quote.input';
import { UpdateQuoteInput } from './dto/update-quote.input';
import { Quote } from './entities/quote.entity';

@Injectable()
export class QuotesService {
  constructor(
    @InjectRepository(Quote)
    private readonly quoteRepository: Repository<Quote>,
    private readonly usersService: UsersService,
    private readonly coursesService: CoursesService,
  ) {}

  async create(createQuoteInput: CreateQuoteInput) {
    const { user_id, course_id, quoteContent, quoteAuthor } = createQuoteInput;
    const user = await this.usersService.findOne(user_id);
    if (!user)
      throw new UserInputError(
        'The author id passed not belongs to any user. Try with other.',
      );
    const course = await this.coursesService.findOne(course_id);
    if (!course)
      throw new UserInputError(
        'The course id passed is not valid. Try with other.',
      );
    const newQuote = this.quoteRepository.create({
      quoteAuthor,
      quoteContent,
      user,
      course,
    });
    return this.quoteRepository.save(newQuote);
  }

  findAll() {
    return this.quoteRepository.find();
  }

  findOne(id: number) {
    return this.quoteRepository.findOne(id);
  }

  findByUser(user_id) {
    return this.quoteRepository.find({ user: { id: user_id } });
  }

  findByAuthor(quoteAuthor) {
    return this.quoteRepository.find({ quoteAuthor });
  }

  findByCourse(course_id) {
    return this.quoteRepository.find({ course: { id: course_id } });
  }

  async update(quote_id: number, updateQuoteInput: UpdateQuoteInput) {
    const { user_id, course_id, quoteContent, quoteAuthor } = updateQuoteInput;
    const quote = await this.quoteRepository.findOne(quote_id);
    if (user_id) {
      const updatedUser = await this.usersService.findOne(user_id);
      if (!updatedUser)
        throw new UserInputError(
          'The author id passed not belongs to any user. Try with other.',
        );
      quote.user = updatedUser;
    }
    if (course_id) {
      const updatedCourse = await this.coursesService.findOne(course_id);
      if (!updatedCourse)
        throw new UserInputError(
          'The course id passed not belongs to any course. Try with other.',
        );
      quote.course = updatedCourse;
    }
    if (quoteAuthor) quote.quoteAuthor = quoteAuthor;
    if (quoteContent) quote.quoteContent = quoteContent;
    return this.quoteRepository.save(quote);
  }

  remove(id: number) {
    return this.quoteRepository.delete(id);
  }
}
