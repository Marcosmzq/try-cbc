import { Module } from '@nestjs/common';
import { TriviasService } from './trivias.service';
import { TriviasResolver } from './trivias.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trivia } from './entities/trivia.entity';
import { JwtService } from 'src/jwt/jwt.service';
import { TriviasAnswersModule } from 'src/trivias-answers/trivias-answers.module';
import { Course } from 'src/courses/entities/course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Trivia, Course]), TriviasAnswersModule],
  providers: [TriviasResolver, TriviasService, JwtService],
})
export class TriviasModule {}
