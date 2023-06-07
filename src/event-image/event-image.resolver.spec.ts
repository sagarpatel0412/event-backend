import { Test, TestingModule } from '@nestjs/testing';
import { EventImageResolver } from './event-image.resolver';
import { EventImageService } from './event-image.service';

describe('EventImageResolver', () => {
  let resolver: EventImageResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventImageResolver, EventImageService],
    }).compile();

    resolver = module.get<EventImageResolver>(EventImageResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
