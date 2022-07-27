import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesResolver } from './notes.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesModule } from 'src/courses/courses.module';
import { UsersModule } from 'src/users/users.module';
import { Note } from './entities/note.entity';

@Module({
  imports: [UsersModule, CoursesModule, TypeOrmModule.forFeature([Note])],
  providers: [NotesResolver, NotesService],
})
export class NotesModule {}
