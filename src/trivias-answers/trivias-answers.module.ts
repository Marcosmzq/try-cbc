import { Module } from '@nestjs/common';
import { TriviasAnswersService } from './trivias-answers.service';
import { TriviasAnswersResolver } from './trivias-answers.resolver';
import { Trivia } from 'src/trivias/entities/trivia.entity';
import { TriviasAnswer } from './entities/trivias-answer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Trivia, TriviasAnswer])],
  providers: [TriviasAnswersResolver, TriviasAnswersService],
})
export class TriviasAnswersModule {}
