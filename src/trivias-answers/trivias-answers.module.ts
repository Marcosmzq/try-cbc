import { Module } from '@nestjs/common';
import { TriviasAnswersService } from './trivias-answers.service';
import { TriviasAnswersResolver } from './trivias-answers.resolver';
import { TriviasAnswer } from './entities/trivias-answer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TriviasAnswer])],
  providers: [TriviasAnswersResolver, TriviasAnswersService],
})
export class TriviasAnswersModule {}
