import { Test, TestingModule } from '@nestjs/testing';
import { ContactFromService } from './contact-from.service';

describe('ContactFromService', () => {
  let service: ContactFromService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContactFromService],
    }).compile();

    service = module.get<ContactFromService>(ContactFromService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
