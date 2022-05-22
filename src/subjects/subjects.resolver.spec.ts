import { Test, TestingModule } from '@nestjs/testing';
import { SubjectsResolver } from './subjects.resolver';
import { SubjectsService } from './subjects.service';

describe('SubjectsResolver', () => {
  let resolver: SubjectsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubjectsResolver, SubjectsService],
    }).compile();

    resolver = module.get<SubjectsResolver>(SubjectsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
