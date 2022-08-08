import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { NotesService } from './notes.service';
import { Note } from './entities/note.entity';
import { CreateNoteInput } from './dto/create-note.input';
import { UpdateNoteInput } from './dto/update-note.input';
import { UseGuards, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AdminAuthGuard } from 'src/auth/guards/admin-role.guard';
import { NotesCrudOpsGuard } from './guards/notes-crud-ops.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { Course } from 'src/courses/entities/course.entity';
import { CourseByIdPipe } from 'src/courses/pipes/course-by-id.pipe';

@Resolver(() => Note)
export class NotesResolver {
  constructor(private readonly notesService: NotesService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Note, { name: 'createNote' })
  createNote(
    @CurrentUser() currentUser: User,
    @Args('course_id', { type: () => Int }, CourseByIdPipe) course: Course,
    @Args('createNoteInput', new ValidationPipe())
    createNoteInput: CreateNoteInput,
  ) {
    return this.notesService.create(currentUser, course, createNoteInput);
  }

  @UseGuards(AdminAuthGuard)
  @Query(() => [Note], { name: 'findAllNotes' })
  findAll() {
    return this.notesService.findAll();
  }

  @UseGuards(NotesCrudOpsGuard)
  @Query(() => Note, { name: 'findNoteById' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.notesService.findOne(id);
  }

  @UseGuards(AdminAuthGuard)
  @Query(() => [Note], { name: 'findNotesByAuthor' })
  findByAuthor(@Args('author_id', { type: () => Int }) author_id: number) {
    return this.notesService.findByAuthor(author_id);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Note], { name: 'findCurrentUserConceptsByCourse' })
  findCurrentUserConceptsByCourse(
    @Args('course_id', { type: () => Int }) course_id: number,
    @CurrentUser() currentUser: User,
  ) {
    return this.notesService.findCurrentUserNotesByCourse(
      currentUser,
      course_id,
    );
  }

  @UseGuards(AdminAuthGuard)
  @Query(() => [Note], { name: 'findNotesByCourse' })
  findByCourse(@Args('course_id', { type: () => Int }) course_id: number) {
    return this.notesService.findByCourse(course_id);
  }

  @UseGuards(NotesCrudOpsGuard)
  @Mutation(() => Note, { name: 'updateNote' })
  updateNote(
    @Args('note_id', { type: () => Int }) note: Note,
    @Args('updateNoteInput') updateNoteInput: UpdateNoteInput,
  ) {
    return this.notesService.update(note, updateNoteInput);
  }

  @UseGuards(NotesCrudOpsGuard)
  @Mutation(() => Note, { name: 'deleteNote' })
  removeNote(@Args('id', { type: () => Int }) id: number) {
    return this.notesService.remove(id);
  }
}
