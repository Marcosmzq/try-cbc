import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserInputError } from 'apollo-server-express';
import { NotesService } from '../notes.service';

@Injectable()
export class NotesCrudOpsGuard implements CanActivate {
  constructor(private readonly notesService: NotesService) {}

  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    const note_id = ctx.getArgs().note_id;
    const user_id = request.user.id;

    const note = await this.notesService.findOne(note_id);
    if (!note) throw new UserInputError('The note id provided is wrong.');
    if (note.author.id !== user_id)
      throw new UnauthorizedException(
        'You are not allowed to operate with records of other user.',
      );

    return true;
  }
}
