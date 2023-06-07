import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EventCityService } from './event-city.service';
import { EventCity } from './entities/event-city.entity';
import { CreateEventCityInput } from './dto/create-event-city.input';
import { UpdateEventCityInput } from './dto/update-event-city.input';
import { AllowUnauthorized } from 'src/auth/decorators/allow-unauthorized.decorator';
import { EventCityModel } from './model/event-city.model';

@Resolver(() => EventCityModel)
export class EventCityResolver {
  constructor(private readonly eventCityService: EventCityService) {}

  @AllowUnauthorized()
  @Mutation(() => EventCityModel)
  createEventCity(
    @Args('createEventCityInput') createEventCityInput: CreateEventCityInput,
  ) {
    return this.eventCityService.createEventCity(createEventCityInput);
  }

  @AllowUnauthorized()
  @Query(() => [EventCityModel])
  getEventCities() {
    return this.eventCityService.getEventCities();
  }

  @AllowUnauthorized()
  @Query(() => EventCityModel)
  getEventCity(@Args('id') id: string) {
    return this.eventCityService.getEventCity(id);
  }

  @AllowUnauthorized()
  @Mutation(() => EventCityModel)
  updateEventCity(
    @Args('id') id: string,
    @Args('updateEventCityInput') updateEventCityInput: UpdateEventCityInput,
  ) {
    return this.eventCityService.updateEventCity(id, updateEventCityInput);
  }

  @AllowUnauthorized()
  @Mutation(() => EventCityModel)
  deleteEventCity(@Args('id') id: string) {
    return this.eventCityService.deleteEventCity(id);
  }
}
