import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesResolver } from './notes.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Note])],
  providers: [NotesResolver, NotesService],
})
export class NotesModule {}
