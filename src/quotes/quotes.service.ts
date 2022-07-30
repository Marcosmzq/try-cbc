import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/courses/entities/course.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateQuoteInput } from './dto/create-quote.input';
import { UpdateQuoteInput } from './dto/update-quote.input';
import { Quote } from './entities/quote.entity';

@Injectable()
export class QuotesService {
  constructor(
    @InjectRepository(Quote)
    private readonly quoteRepository: Repository<Quote>,
  ) {}

  async create(user: User, course: Course, createQuoteInput: CreateQuoteInput) {
    const { quoteContent, quoteAuthor } = createQuoteInput;
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

  findCurrentUserNotesByCourse(currentUser: User, course: Course) {
    return this.quoteRepository.find({
      where: {
        user: currentUser,
        course,
      },
    });
  }

  findCurrentUserRandomQuoteByCourse(currentUser: User, course: Course) {
    return this.quoteRepository
      .createQueryBuilder('quote')
      .leftJoinAndSelect('quote.user', 'user')
      .leftJoinAndSelect('quote.course', 'course')
      .orderBy('RANDOM()')
      .where({
        course,
        author: currentUser,
      })
      .getOne();
  }

  async update(quote: Quote, updateQuoteInput: UpdateQuoteInput) {
    const { quoteContent, quoteAuthor } = updateQuoteInput;
    if (quoteAuthor) quote.quoteAuthor = quoteAuthor;
    if (quoteContent) quote.quoteContent = quoteContent;
    return this.quoteRepository.save(quote);
  }

  remove(id: number) {
    return this.quoteRepository.delete(id);
  }
}
