import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/courses/entities/course.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateNoteInput } from './dto/create-note.input';
import { UpdateNoteInput } from './dto/update-note.input';
import { Note } from './entities/note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
  ) {}

  async create(user: User, course: Course, createNoteInput: CreateNoteInput) {
    const { title, content } = createNoteInput;
    const newNote = this.noteRepository.create({
      title,
      content,
      author: user,
      course,
    });
    return this.noteRepository.save(newNote);
  }

  findAll() {
    return this.noteRepository.find();
  }

  findOne(id: number) {
    return this.noteRepository.findOne(id);
  }

  findByAuthor(author_id) {
    return this.noteRepository.find({ author: { id: author_id } });
  }

  findByCourse(course_id) {
    return this.noteRepository.find({ course: { id: course_id } });
  }
  findCurrentUserNotesByCourse(currentUser: User, course_id: number) {
    return this.noteRepository.find({
      where: {
        course: { id: course_id },
        author: currentUser,
      },
    });
  }

  async update(note: Note, updateNoteInput: UpdateNoteInput) {
    const { content, title } = updateNoteInput;
    if (title) note.title = title;
    if (content) note.content = content;
    return this.noteRepository.save(note);
  }

  remove(id: number) {
    return this.noteRepository.delete(id);
  }
}
