import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserInputError } from 'apollo-server-express';
import { TimelineEventsService } from '../timeline-events.service';

@Injectable()
export class TimelineEventsCrudOpsGuard implements CanActivate {
  constructor(private readonly timelineEventsService: TimelineEventsService) {}

  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    const timelineEvent_id = ctx.getArgs().timelineEvent_id;
    const user_id = request.user.id;

    const timelineEvent = await this.timelineEventsService.findOne(
      timelineEvent_id,
    );
    if (!timelineEvent)
      throw new UserInputError('The timeline event id provided is wrong.');
    if (timelineEvent.timeline.user.id !== user_id)
      throw new UnauthorizedException(
        'You are not allowed to operate with records of other user.',
      );

    return true;
  }
}
