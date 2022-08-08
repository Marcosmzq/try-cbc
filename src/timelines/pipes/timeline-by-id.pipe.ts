import { PipeTransform, Injectable } from '@nestjs/common';
import { UserInputError } from 'apollo-server-express';
import { TimelinesService } from '../timelines.service';

@Injectable()
export class TimelineByIdPipe implements PipeTransform {
  constructor(private readonly timelinesService: TimelinesService) {}

  async transform(value: any) {
    const timeline = await this.timelinesService.findOne(value);
    if (!timeline)
      throw new UserInputError(
        'The timeline id provided is wrong, try with other.',
      );
    return timeline;
  }
}
