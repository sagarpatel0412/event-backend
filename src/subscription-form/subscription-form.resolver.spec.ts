import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionFormResolver } from './subscription-form.resolver';
import { SubscriptionFormService } from './subscription-form.service';

describe('SubscriptionFromResolver', () => {
  let resolver: SubscriptionFormResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubscriptionFormResolver, SubscriptionFormService],
    }).compile();

    resolver = module.get<SubscriptionFormResolver>(SubscriptionFormResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
