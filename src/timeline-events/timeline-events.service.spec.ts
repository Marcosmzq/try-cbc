import { Test, TestingModule } from '@nestjs/testing';
import { TimelineEventsService } from './timeline-events.service';

describe('TimelineEventsService', () => {
  let service: TimelineEventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimelineEventsService],
    }).compile();

    service = module.get<TimelineEventsService>(TimelineEventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
