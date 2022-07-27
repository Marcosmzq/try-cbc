import { Module } from '@nestjs/common';
import { ConceptsService } from './concepts.service';
import { ConceptsResolver } from './concepts.resolver';
import { UsersModule } from 'src/users/users.module';
import { Concept } from './entities/concept.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesModule } from 'src/courses/courses.module';

@Module({
  imports: [UsersModule, CoursesModule, TypeOrmModule.forFeature([Concept])],
  providers: [ConceptsResolver, ConceptsService],
})
export class ConceptsModule {}
