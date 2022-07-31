import { Module } from '@nestjs/common';
import { TriviasAnswersService } from './trivias-answers.service';
import { TriviasAnswersResolver } from './trivias-answers.resolver';
import { TriviasAnswer } from './entities/trivias-answer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TriviasModule } from 'src/trivias/trivias.module';

@Module({
  imports: [TypeOrmModule.forFeature([TriviasAnswer]), TriviasModule],
  providers: [TriviasAnswersResolver, TriviasAnswersService],
})
export class TriviasAnswersModule {}
