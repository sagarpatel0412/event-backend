import { Test, TestingModule } from '@nestjs/testing';
import { BlogImageService } from './blog-image.service';

describe('BlogImageService', () => {
  let service: BlogImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlogImageService],
    }).compile();

    service = module.get<BlogImageService>(BlogImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
