import { Test, TestingModule } from '@nestjs/testing';
import { EventPriceService } from './event-price.service';

describe('EventPriceService', () => {
  let service: EventPriceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventPriceService],
    }).compile();

    service = module.get<EventPriceService>(EventPriceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
