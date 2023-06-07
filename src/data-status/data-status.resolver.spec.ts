import { Test, TestingModule } from '@nestjs/testing';
import { DataStatusResolver } from './data-status.resolver';
import { DataStatusService } from './data-status.service';

describe('DataStatusResolver', () => {
  let resolver: DataStatusResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataStatusResolver, DataStatusService],
    }).compile();

    resolver = module.get<DataStatusResolver>(DataStatusResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
