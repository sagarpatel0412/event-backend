import { Test, TestingModule } from '@nestjs/testing';
import { EventCityService } from './event-city.service';

describe('EventCityService', () => {
  let service: EventCityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventCityService],
    }).compile();

    service = module.get<EventCityService>(EventCityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
