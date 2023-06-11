import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BlogImageService } from './blog-image.service';
import { CreateBlogImageInput } from './dto/create-blog-image.input';
import { UpdateBlogImageInput } from './dto/update-blog-image.input';
import { BlogImageModel } from './model/blog-image.model';
import { AllowUnauthorized } from 'src/auth/decorators/allow-unauthorized.decorator';

@Resolver(() => BlogImageModel)
export class BlogImageResolver {
  constructor(private readonly blogImageService: BlogImageService) {}

  @AllowUnauthorized()
  @Mutation(() => BlogImageModel)
  createBlogImage(
    @Args('createBlogImageInput') createBlogImageInput: CreateBlogImageInput,
  ) {
    return this.blogImageService.createBlogImage(createBlogImageInput);
  }

  @AllowUnauthorized()
  @Query(() => [BlogImageModel])
  getBlogImages() {
    return this.blogImageService.getBlogImages();
  }

  @AllowUnauthorized()
  @Query(() => BlogImageModel)
  getBlogImage(@Args('id') id: string) {
    return this.blogImageService.getBlogImage(id);
  }

  @AllowUnauthorized()
  @Mutation(() => BlogImageModel)
  updateBlogImage(
    @Args('id') id: string,
    @Args('updateBlogImageInput') updateBlogImageInput: UpdateBlogImageInput,
  ) {
    return this.blogImageService.updateBlogImage(id, updateBlogImageInput);
  }

  @AllowUnauthorized()
  @Mutation(() => BlogImageModel)
  deleteBlogImage(@Args('id') id: string) {
    return this.blogImageService.deleteBlogImage(id);
  }
}
