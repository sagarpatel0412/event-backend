import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { EventServiceService } from './event-service.service';
import { CreateEventServiceInput } from './dto/create-event-service.input';
import { UpdateEventServiceInput } from './dto/update-event-service.input';
import { EventServiceModel } from './model/event-service.model';
import { AllowUnauthorized } from 'src/auth/decorators/allow-unauthorized.decorator';

@Resolver(() => EventServiceModel)
export class EventServiceResolver {
  constructor(private readonly eventServiceService: EventServiceService) {}

  @AllowUnauthorized()
  @Mutation(() => EventServiceModel)
  createEventService(
    @Args('createEventServiceInput')
    createEventServiceInput: CreateEventServiceInput,
  ) {
    return this.eventServiceService.createEventService(createEventServiceInput);
  }

  @AllowUnauthorized()
  @Query(() => [EventServiceModel])
  getEventServices() {
    return this.eventServiceService.getEventServices();
  }

  @AllowUnauthorized()
  @Query(() => EventServiceModel)
  getEventService(@Args('id') id: string) {
    return this.eventServiceService.getEventService(id);
  }

  @AllowUnauthorized()
  @Mutation(() => EventServiceModel)
  updateEventService(
    @Args('id') id: string,
    @Args('updateEventServiceInput')
    updateEventServiceInput: UpdateEventServiceInput,
  ) {
    return this.eventServiceService.updateEventService(
      id,
      updateEventServiceInput,
    );
  }

  @AllowUnauthorized()
  @Mutation(() => EventServiceModel)
  deleteEventService(@Args('id') id: string) {
    return this.eventServiceService.deleteEventService(id);
  }
}
