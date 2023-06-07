import { Test, TestingModule } from '@nestjs/testing';
import { DataStatusService } from './data-status.service';

describe('DataStatusService', () => {
  let service: DataStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataStatusService],
    }).compile();

    service = module.get<DataStatusService>(DataStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
