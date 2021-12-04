import { Test, TestingModule } from '@nestjs/testing';
import { TriviasService } from './trivias.service';

describe('TriviasService', () => {
  let service: TriviasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TriviasService],
    }).compile();

    service = module.get<TriviasService>(TriviasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
