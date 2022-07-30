import { PipeTransform, Injectable } from '@nestjs/common';
import { UserInputError } from 'apollo-server-express';
import { NotesService } from '../notes.service';

@Injectable()
export class NoteByIdPipe implements PipeTransform {
  constructor(private readonly notesService: NotesService) {}

  async transform(value: any) {
    const note = await this.notesService.findOne(value);
    if (!note)
      throw new UserInputError(
        'The note id provided is wrong, try with other.',
      );
    return note;
  }
}
