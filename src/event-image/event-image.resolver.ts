import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { EventImageService } from './event-image.service';
import { CreateEventImageInput } from './dto/create-event-image.input';
import { UpdateEventImageInput } from './dto/update-event-image.input';
import { EventImageModel } from './model/event-image.model';
import { AllowUnauthorized } from 'src/auth/decorators/allow-unauthorized.decorator';

@Resolver(() => EventImageModel)
export class EventImageResolver {
  constructor(private readonly eventImageService: EventImageService) {}

  @AllowUnauthorized()
  @Mutation(() => EventImageModel)
  createEventImage(
    @Args('createEventImageInput') createEventImageInput: CreateEventImageInput,
  ) {
    return this.eventImageService.createEventImage(createEventImageInput);
  }

  @AllowUnauthorized()
  @Query(() => [EventImageModel])
  getEventImages() {
    return this.eventImageService.getEventImages();
  }

  @AllowUnauthorized()
  @Query(() => EventImageModel)
  getEventImage(@Args('id') id: string) {
    return this.eventImageService.getEventImage(id);
  }

  @AllowUnauthorized()
  @Mutation(() => EventImageModel)
  updateEventImage(
    @Args('id') id: string,
    @Args('updateEventImageInput') updateEventImageInput: UpdateEventImageInput,
  ) {
    return this.eventImageService.updateEventImage(id, updateEventImageInput);
  }

  @AllowUnauthorized()
  @Mutation(() => EventImageModel)
  deleteEventImage(@Args('id') id: string) {
    return this.eventImageService.deleteEventImage(id);
  }
}
