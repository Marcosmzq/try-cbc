import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInputError } from 'apollo-server-express';
import { TimelinesService } from 'src/timelines/timelines.service';
import { Repository } from 'typeorm';
import { CreateTimelineEventInput } from './dto/create-timeline-event.input';
import { UpdateTimelineEventInput } from './dto/update-timeline-event.input';
import { TimelineEvent } from './entities/timeline-event.entity';

@Injectable()
export class TimelineEventsService {
  constructor(
    @InjectRepository(TimelineEvent)
    private readonly timelineEventRepository: Repository<TimelineEvent>,
    private readonly timelinesService: TimelinesService,
  ) {}

  async create(createTimelineEventInput: CreateTimelineEventInput) {
    const { eventContent, eventDate, eventTitle, timeline_id } =
      createTimelineEventInput;
    const timeline = await this.timelinesService.findOne(timeline_id);
    if (!timeline)
      throw new UserInputError(
        'The timeline id passed not belongs to any timeline. Try with other.',
      );
    const newTimelineEvent = this.timelineEventRepository.create({
      eventContent,
      eventDate,
      eventTitle,
      timeline,
    });
    return this.timelineEventRepository.save(newTimelineEvent);
  }

  findAll() {
    return this.timelineEventRepository.find();
  }

  findOne(id: number) {
    return this.timelineEventRepository.findOne(id);
  }

  findByTimeline(timeline_id) {
    return this.timelineEventRepository.find({ timeline: { id: timeline_id } });
  }

  async update(
    timelineEvent_id: number,
    updateTimelineEventInput: UpdateTimelineEventInput,
  ) {
    const { eventContent, eventDate, eventTitle, timeline_id } =
      updateTimelineEventInput;
    const timelineEvent = await this.timelineEventRepository.findOne(
      timelineEvent_id,
    );
    if (!timelineEvent)
      throw new UserInputError(
        'The timeline event id passed not belongs to any event. Try with other.',
      );
    if (timeline_id) {
      const updatedTimeline = await this.timelinesService.findOne(timeline_id);
      if (!updatedTimeline)
        throw new UserInputError(
          'The timeline id passed not belongs to any timeline. Try with other.',
        );
      timelineEvent.timeline = updatedTimeline;
    }
    if (eventTitle) timelineEvent.eventTitle = eventTitle;
    if (eventContent) timelineEvent.eventContent = eventContent;
    if (eventDate) timelineEvent.eventDate = eventDate;

    return this.timelineEventRepository.save(timelineEvent);
  }

  remove(id: number) {
    return this.timelineEventRepository.delete(id);
  }
}
