import { Module } from '@nestjs/common';
import { TriviasService } from './trivias.service';
import { TriviasResolver } from './trivias.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trivia } from './entities/trivia.entity';
import { AnswersModule } from './answers/answers.module';
import { JwtService } from 'src/jwt/jwt.service';

@Module({
  imports: [TypeOrmModule.forFeature([Trivia]), AnswersModule],
  providers: [TriviasResolver, TriviasService, JwtService],
})
export class TriviasModule {}
