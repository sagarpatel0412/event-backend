import { Test, TestingModule } from '@nestjs/testing';
import { EventCityResolver } from './event-city.resolver';
import { EventCityService } from './event-city.service';

describe('EventCityResolver', () => {
  let resolver: EventCityResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventCityResolver, EventCityService],
    }).compile();

    resolver = module.get<EventCityResolver>(EventCityResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
