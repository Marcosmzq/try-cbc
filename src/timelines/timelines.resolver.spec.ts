import { Test, TestingModule } from '@nestjs/testing';
import { TimelinesResolver } from './timelines.resolver';
import { TimelinesService } from './timelines.service';

describe('TimelinesResolver', () => {
  let resolver: TimelinesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimelinesResolver, TimelinesService],
    }).compile();

    resolver = module.get<TimelinesResolver>(TimelinesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
