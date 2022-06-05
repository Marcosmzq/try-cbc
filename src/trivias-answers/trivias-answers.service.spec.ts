import { Test, TestingModule } from '@nestjs/testing';
import { TriviasAnswersService } from './trivias-answers.service';

describe('TriviasAnswersService', () => {
  let service: TriviasAnswersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TriviasAnswersService],
    }).compile();

    service = module.get<TriviasAnswersService>(TriviasAnswersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
