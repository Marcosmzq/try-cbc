import { PipeTransform, Injectable } from '@nestjs/common';
import { UserInputError } from 'apollo-server-express';
import { TimelineEventsService } from '../timeline-events.service';

@Injectable()
export class TimelineEventByIdPipe implements PipeTransform {
  constructor(private readonly timelineEventsService: TimelineEventsService) {}

  async transform(value: any) {
    const timelineEvent = await this.timelineEventsService.findOne(value);
    if (!timelineEvent)
      throw new UserInputError(
        'The timeline event id provided is wrong, try with other.',
      );
    return timelineEvent;
  }
}
