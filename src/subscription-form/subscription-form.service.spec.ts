import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionFormService } from './subscription-form.service';

describe('SubscriptionFromService', () => {
  let service: SubscriptionFormService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubscriptionFormService],
    }).compile();

    service = module.get<SubscriptionFormService>(SubscriptionFormService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
