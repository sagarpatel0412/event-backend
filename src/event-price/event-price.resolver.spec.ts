import { Test, TestingModule } from '@nestjs/testing';
import { EventPriceResolver } from './event-price.resolver';
import { EventPriceService } from './event-price.service';

describe('EventPriceResolver', () => {
  let resolver: EventPriceResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventPriceResolver, EventPriceService],
    }).compile();

    resolver = module.get<EventPriceResolver>(EventPriceResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
