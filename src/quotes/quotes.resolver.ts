import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { QuotesService } from './quotes.service';
import { Quote } from './entities/quote.entity';
import { CreateQuoteInput } from './dto/create-quote.input';
import { UpdateQuoteInput } from './dto/update-quote.input';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CourseByIdPipe } from 'src/courses/pipes/course-by-id.pipe';
import { Course } from 'src/courses/entities/course.entity';
import { QuoteByIdPipe } from './pipes/quote-by-id.pipe';
import { AdminAuthGuard } from 'src/auth/guards/admin-role.guard';
import { QuotesCrudOpsGuard } from './guards/quotes-crud-ops.guard';

@Resolver(() => Quote)
export class QuotesResolver {
  constructor(private readonly quotesService: QuotesService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Quote, { name: 'createQuote' })
  createQuote(
    @CurrentUser() currentUser: User,
    @Args('course_id', { type: () => Int }, CourseByIdPipe) course: Course,
    @Args('createQuoteInput') createQuoteInput: CreateQuoteInput,
  ) {
    return this.quotesService.create(currentUser, course, createQuoteInput);
  }

  @UseGuards(AdminAuthGuard)
  @Query(() => [Quote], { name: 'findAllQuotes' })
  findAll() {
    return this.quotesService.findAll();
  }

  @UseGuards(JwtAuthGuard, QuotesCrudOpsGuard)
  @Query(() => Quote, { name: 'findQuoteById' })
  findOne(@Args('quote_id', { type: () => Int }) id: number) {
    return this.quotesService.findOne(id);
  }

  @UseGuards(AdminAuthGuard)
  @Query(() => [Quote], { name: 'findNotesByUser' })
  findByAuthor(@Args('user_id', { type: () => Int }) user_id: number) {
    return this.quotesService.findByUser(user_id);
  }

  @UseGuards(AdminAuthGuard)
  @Query(() => [Quote], { name: 'findNotesByCourse' })
  findByCourse(@Args('course_id', { type: () => Int }) course_id: number) {
    return this.quotesService.findByCourse(course_id);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Quote], { name: 'findCurrentUserQuotesByCourse' })
  findCurrentUserQuotesByCourse(
    @CurrentUser() currentUser: User,
    @Args('course_id', { type: () => Int }, CourseByIdPipe) course: Course,
  ) {
    return this.quotesService.findCurrentUserNotesByCourse(currentUser, course);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Quote, { name: 'findCurrentUserRandomQuoteByCourse' })
  findCurrentUserRandomQuoteByCourse(
    @Args('course_id', { type: () => Int }, CourseByIdPipe) course: Course,
    @CurrentUser() currentUser: User,
  ) {
    return this.quotesService.findCurrentUserRandomQuoteByCourse(
      currentUser,
      course,
    );
  }

  @UseGuards(JwtAuthGuard, QuotesCrudOpsGuard)
  @Mutation(() => Quote, { name: 'updateQuote' })
  updateQuote(
    @Args('quote_id', { type: () => Int }, QuoteByIdPipe) quote: Quote,
    @Args('updateQuoteInput') updateQuoteInput: UpdateQuoteInput,
  ) {
    return this.quotesService.update(quote, updateQuoteInput);
  }

  @UseGuards(JwtAuthGuard, QuotesCrudOpsGuard)
  @Mutation(() => Quote, { name: 'deleteQuote' })
  removeQuote(@Args('quote_id', { type: () => Int }) id: number) {
    return this.quotesService.remove(id);
  }
}
