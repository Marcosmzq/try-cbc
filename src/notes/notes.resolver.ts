import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { NotesService } from './notes.service';
import { Note } from './entities/note.entity';
import { CreateNoteInput } from './dto/create-note.input';
import { UpdateNoteInput } from './dto/update-note.input';
import { ValidationPipe } from '@nestjs/common';

@Resolver(() => Note)
export class NotesResolver {
  constructor(private readonly notesService: NotesService) {}

  @Mutation(() => Note, { name: 'createNote' })
  createNote(
    @Args('createNoteInput', new ValidationPipe())
    createNoteInput: CreateNoteInput,
  ) {
    return this.notesService.create(createNoteInput);
  }

  @Query(() => [Note], { name: 'findAllNotes' })
  findAll() {
    return this.notesService.findAll();
  }

  @Query(() => Note, { name: 'findNoteById' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.notesService.findOne(id);
  }

  @Query(() => [Note], { name: 'findNotesByAuthor' })
  findByAuthor(@Args('author_id', { type: () => Int }) author_id: number) {
    return this.notesService.findByAuthor(author_id);
  }

  @Query(() => [Note], { name: 'findNotesByCourse' })
  findByCourse(@Args('course_id', { type: () => Int }) course_id: number) {
    return this.notesService.findByCourse(course_id);
  }

  @Mutation(() => Note, { name: 'updateNote' })
  updateNote(@Args('updateNoteInput') updateNoteInput: UpdateNoteInput) {
    return this.notesService.update(updateNoteInput.id, updateNoteInput);
  }

  @Mutation(() => Note, { name: 'deleteNote' })
  removeNote(@Args('id', { type: () => Int }) id: number) {
    return this.notesService.remove(id);
  }
}
