import { Module } from '@nestjs/common';
import { TimelineEventsService } from './timeline-events.service';
import { TimelineEventsResolver } from './timeline-events.resolver';
import { TimelineEvent } from './entities/timeline-event.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TimelineEvent])],
  providers: [TimelineEventsResolver, TimelineEventsService],
})
export class TimelineEventsModule {}
