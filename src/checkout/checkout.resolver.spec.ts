import { Test, TestingModule } from '@nestjs/testing';
import { CheckoutResolver } from './checkout.resolver';
import { CheckoutService } from './checkout.service';

describe('CheckoutResolver', () => {
  let resolver: CheckoutResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CheckoutResolver, CheckoutService],
    }).compile();

    resolver = module.get<CheckoutResolver>(CheckoutResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
