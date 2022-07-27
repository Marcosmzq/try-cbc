import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { QuotesService } from './quotes.service';
import { Quote } from './entities/quote.entity';
import { CreateQuoteInput } from './dto/create-quote.input';
import { UpdateQuoteInput } from './dto/update-quote.input';

@Resolver(() => Quote)
export class QuotesResolver {
  constructor(private readonly quotesService: QuotesService) {}

  @Mutation(() => Quote, { name: 'createQuote' })
  createQuote(@Args('createQuoteInput') createQuoteInput: CreateQuoteInput) {
    return this.quotesService.create(createQuoteInput);
  }

  @Query(() => [Quote], { name: 'findAllQuotes' })
  findAll() {
    return this.quotesService.findAll();
  }

  @Query(() => Quote, { name: 'findQuoteById' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.quotesService.findOne(id);
  }

  @Query(() => [Quote], { name: 'findNotesByUser' })
  findByAuthor(@Args('user_id', { type: () => Int }) user_id: number) {
    return this.quotesService.findByUser(user_id);
  }

  @Query(() => [Quote], { name: 'findNotesByCourse' })
  findByCourse(@Args('course_id', { type: () => Int }) course_id: number) {
    return this.quotesService.findByCourse(course_id);
  }

  @Mutation(() => Quote, { name: 'updateQuote' })
  updateQuote(@Args('updateQuoteInput') updateQuoteInput: UpdateQuoteInput) {
    return this.quotesService.update(updateQuoteInput.id, updateQuoteInput);
  }

  @Mutation(() => Quote, { name: 'delteQuote' })
  removeQuote(@Args('id', { type: () => Int }) id: number) {
    return this.quotesService.remove(id);
  }
}
