import { Module } from '@nestjs/common';
import { ConceptsService } from './concepts.service';
import { ConceptsResolver } from './concepts.resolver';
import { Concept } from './entities/concept.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesModule } from 'src/courses/courses.module';

@Module({
  imports: [CoursesModule, TypeOrmModule.forFeature([Concept])],
  providers: [ConceptsResolver, ConceptsService],
})
export class ConceptsModule {}
