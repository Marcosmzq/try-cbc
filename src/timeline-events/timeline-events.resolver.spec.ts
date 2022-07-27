import { Test, TestingModule } from '@nestjs/testing';
import { TimelineEventsResolver } from './timeline-events.resolver';
import { TimelineEventsService } from './timeline-events.service';

describe('TimelineEventsResolver', () => {
  let resolver: TimelineEventsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimelineEventsResolver, TimelineEventsService],
    }).compile();

    resolver = module.get<TimelineEventsResolver>(TimelineEventsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
