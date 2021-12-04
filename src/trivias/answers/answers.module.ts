import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { AnswersResolver } from './answers.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trivia } from '../entities/trivia.entity';
import { Answer } from './entities/answer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Trivia, Answer]), AnswersModule],
  providers: [AnswersResolver, AnswersService],
})
export class AnswersModule {}
