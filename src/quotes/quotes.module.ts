import { Module } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { QuotesResolver } from './quotes.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesModule } from 'src/courses/courses.module';
import { UsersModule } from 'src/users/users.module';
import { Quote } from './entities/quote.entity';

@Module({
  imports: [UsersModule, CoursesModule, TypeOrmModule.forFeature([Quote])],
  providers: [QuotesResolver, QuotesService],
})
export class QuotesModule {}
