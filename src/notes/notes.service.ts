import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInputError } from 'apollo-server-express';
import { CoursesService } from 'src/courses/courses.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateNoteInput } from './dto/create-note.input';
import { UpdateNoteInput } from './dto/update-note.input';
import { Note } from './entities/note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
    private readonly usersService: UsersService,
    private readonly coursesService: CoursesService,
  ) {}

  async create(createNoteInput: CreateNoteInput) {
    const { author_id, course_id, title, content } = createNoteInput;
    const user = await this.usersService.findOne(author_id);
    if (!user)
      throw new UserInputError(
        'The author id passed not belongs to any user. Try with other.',
      );
    const course = await this.coursesService.findOne(course_id);
    if (!course)
      throw new UserInputError(
        'The course id passed is not valid. Try with other.',
      );
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

  async update(note_id: number, updateNoteInput: UpdateNoteInput) {
    const { author_id, course_id, content, title } = updateNoteInput;
    const note = await this.noteRepository.findOne(note_id);
    if (author_id) {
      const updatedAuthor = await this.usersService.findOne(author_id);
      if (!updatedAuthor)
        throw new UserInputError(
          'The author id passed not belongs to any user. Try with other.',
        );
      note.author = updatedAuthor;
    }
    if (course_id) {
      const updatedCourse = await this.coursesService.findOne(course_id);
      if (!updatedCourse)
        throw new UserInputError(
          'The course id passed not belongs to any course. Try with other.',
        );
      note.course = updatedCourse;
    }
    if (title) note.title = title;
    if (content) note.content = content;
    return this.noteRepository.save(note);
  }

  remove(id: number) {
    return this.noteRepository.delete(id);
  }
}
