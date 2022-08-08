import { Module } from '@nestjs/common';
import { TriviasService } from './trivias.service';
import { TriviasResolver } from './trivias.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trivia } from './entities/trivia.entity';
import { CoursesModule } from 'src/courses/courses.module';

@Module({
  imports: [TypeOrmModule.forFeature([Trivia]), CoursesModule],
  providers: [TriviasResolver, TriviasService],
  exports: [TriviasService],
})
export class TriviasModule {}
