import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Timeline } from 'src/timelines/entities/timeline.entity';
import { Repository } from 'typeorm';
import { CreateTimelineEventInput } from './dto/create-timeline-event.input';
import { UpdateTimelineEventInput } from './dto/update-timeline-event.input';
import { TimelineEvent } from './entities/timeline-event.entity';

@Injectable()
export class TimelineEventsService {
  constructor(
    @InjectRepository(TimelineEvent)
    private readonly timelineEventRepository: Repository<TimelineEvent>,
  ) {}

  async create(
    timeline: Timeline,
    createTimelineEventInput: CreateTimelineEventInput,
  ) {
    const { eventContent, eventDate, eventTitle } = createTimelineEventInput;
    const newEvent = this.timelineEventRepository.create({
      eventContent,
      eventDate,
      eventTitle,
      timeline,
    });
    return this.timelineEventRepository.save(newEvent);
  }

  findAll() {
    return this.timelineEventRepository.find();
  }

  findOne(id: number) {
    return this.timelineEventRepository.findOne(id);
  }

  findRandomEventBTimeline(timeline: Timeline) {
    return this.timelineEventRepository
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.timeline', 'timeline')
      .orderBy('RANDOM()')
      .where({
        timeline,
      })
      .getOne();
  }

  findByTimeline(timeline: Timeline) {
    return this.timelineEventRepository.find({ timeline });
  }

  async update(
    timelineEvent: TimelineEvent,
    updateTimelineEventInput: UpdateTimelineEventInput,
  ) {
    const { eventContent, eventDate, eventTitle } = updateTimelineEventInput;
    if (eventTitle) timelineEvent.eventTitle = eventTitle;
    if (eventContent) timelineEvent.eventContent = eventContent;
    if (eventDate) timelineEvent.eventDate = eventDate;

    return this.timelineEventRepository.save(timelineEvent);
  }

  remove(id: number) {
    return this.timelineEventRepository.delete(id);
  }
}
