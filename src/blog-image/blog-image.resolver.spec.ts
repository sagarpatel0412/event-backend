import { Test, TestingModule } from '@nestjs/testing';
import { BlogImageResolver } from './blog-image.resolver';
import { BlogImageService } from './blog-image.service';

describe('BlogImageResolver', () => {
  let resolver: BlogImageResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlogImageResolver, BlogImageService],
    }).compile();

    resolver = module.get<BlogImageResolver>(BlogImageResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
