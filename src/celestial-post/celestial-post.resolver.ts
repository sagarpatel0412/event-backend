import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CelestialPostService } from './celestial-post.service';
import { CreateCelestialPostInput } from './dto/create-celestial-post.input';
import { UpdateCelestialPostInput } from './dto/update-celestial-post.input';
import { CelestialPostModel } from './model/celestial-post.model';
import { AllowUnauthorized } from '../auth/decorators/allow-unauthorized.decorator';
import { CelestialPostCountModel } from './model/celestial-post-count.model';
import { GqlAuthId } from '../auth/decorators/gql-auth-id.decorator';
import { CreateUserCelestialPostInput } from './dto/create-user-celestial-post.input';

@Resolver(() => CelestialPostModel)
export class CelestialPostResolver {
  constructor(private readonly celestialPostService: CelestialPostService) {}

  @AllowUnauthorized()
  @Mutation(() => CelestialPostModel)
  createPost(
    @Args('createCelestialPostInput')
    createCelestialPostInput: CreateCelestialPostInput,
  ) {
    return this.celestialPostService.createPost(createCelestialPostInput);
  }

  @AllowUnauthorized()
  @Query(() => [CelestialPostModel])
  getPosts() {
    return this.celestialPostService.getPosts();
  }

  @AllowUnauthorized()
  @Query(() => CelestialPostModel)
  getPost(@Args('id') id: string) {
    return this.celestialPostService.getPost(id);
  }

  @AllowUnauthorized()
  @Mutation(() => CelestialPostModel)
  updatePost(
    @Args('id') id: string,
    @Args('updateCelestialPostInput')
    updateCelestialPostInput: UpdateCelestialPostInput,
  ) {
    return this.celestialPostService.updatePost(id, updateCelestialPostInput);
  }

  @AllowUnauthorized()
  @Mutation(() => CelestialPostModel)
  deletePost(@Args('id') id: string) {
    return this.celestialPostService.deletePost(id);
  }

  @AllowUnauthorized()
  @Query(() => CelestialPostCountModel)
  postCount() {
    return this.celestialPostService.postCount();
  }

  @Query(() => [CelestialPostModel])
  getUserPosts(@GqlAuthId() userId: string) {
    return this.celestialPostService.getUserPosts(userId);
  }

  @Mutation(() => CelestialPostModel)
  createUserPost(
    @GqlAuthId() userId: string,
    @Args('createUserCelestialPostInput')
    createUserCelestialPostInput: CreateUserCelestialPostInput,
  ) {
    return this.celestialPostService.createUserPost(
      userId,
      createUserCelestialPostInput,
    );
  }
}
