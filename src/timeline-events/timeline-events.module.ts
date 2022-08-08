import { Module } from '@nestjs/common';
import { TimelineEventsService } from './timeline-events.service';
import { TimelineEventsResolver } from './timeline-events.resolver';
import { TimelineEvent } from './entities/timeline-event.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimelinesModule } from 'src/timelines/timelines.module';

@Module({
  imports: [TypeOrmModule.forFeature([TimelineEvent]),TimelinesModule],
  providers: [TimelineEventsResolver, TimelineEventsService],
})
export class TimelineEventsModule {}
