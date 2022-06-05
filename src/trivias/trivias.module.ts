import { Module } from '@nestjs/common';
import { TriviasService } from './trivias.service';
import { TriviasResolver } from './trivias.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trivia } from './entities/trivia.entity';
import { JwtService } from 'src/jwt/jwt.service';
import { Subject } from 'src/subjects/entities/subject.entity';
import { TriviasAnswersModule } from 'src/trivias-answers/trivias-answers.module';

@Module({
  imports: [TypeOrmModule.forFeature([Trivia, Subject]), TriviasAnswersModule],
  providers: [TriviasResolver, TriviasService, JwtService],
})
export class TriviasModule {}
