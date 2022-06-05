import { Test, TestingModule } from '@nestjs/testing';
import { TriviasAnswersResolver } from './trivias-answers.resolver';
import { TriviasAnswersService } from './trivias-answers.service';

describe('TriviasAnswersResolver', () => {
  let resolver: TriviasAnswersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TriviasAnswersResolver, TriviasAnswersService],
    }).compile();

    resolver = module.get<TriviasAnswersResolver>(TriviasAnswersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
