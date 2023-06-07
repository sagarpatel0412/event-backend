import { Test, TestingModule } from '@nestjs/testing';
import { ContactFromResolver } from './contact-from.resolver';
import { ContactFromService } from './contact-from.service';

describe('ContactFromResolver', () => {
  let resolver: ContactFromResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContactFromResolver, ContactFromService],
    }).compile();

    resolver = module.get<ContactFromResolver>(ContactFromResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
