import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserInputError } from 'apollo-server-express';
import { TimelinesService } from '../timelines.service';

@Injectable()
export class TimelinesCrudOpsGuard implements CanActivate {
  constructor(private readonly timelinesService: TimelinesService) {}

  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    const timeline_id = ctx.getArgs().timeline_id;
    const user_id = request.user.id;

    const timeline = await this.timelinesService.findOne(timeline_id);
    if (!timeline)
      throw new UserInputError('The timeline id provided is wrong.');
    if (timeline.user.id !== user_id)
      throw new UnauthorizedException(
        'You are not allowed to operate with records of other user.',
      );

    return true;
  }
}
