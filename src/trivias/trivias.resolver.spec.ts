import { Test, TestingModule } from '@nestjs/testing';
import { TriviasResolver } from './trivias.resolver';
import { TriviasService } from './trivias.service';

describe('TriviasResolver', () => {
  let resolver: TriviasResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TriviasResolver, TriviasService],
    }).compile();

    resolver = module.get<TriviasResolver>(TriviasResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
