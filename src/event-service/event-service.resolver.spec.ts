import { Test, TestingModule } from '@nestjs/testing';
import { EventServiceResolver } from './event-service.resolver';
import { EventServiceService } from './event-service.service';

describe('EventServiceResolver', () => {
  let resolver: EventServiceResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventServiceResolver, EventServiceService],
    }).compile();

    resolver = module.get<EventServiceResolver>(EventServiceResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
