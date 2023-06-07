import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EventPriceService } from './event-price.service';
import { CreateEventPriceInput } from './dto/create-event-price.input';
import { UpdateEventPriceInput } from './dto/update-event-price.input';
import { EventPriceModel } from './model/event-price.model';
import { AllowUnauthorized } from 'src/auth/decorators/allow-unauthorized.decorator';

@Resolver(() => EventPriceModel)
export class EventPriceResolver {
  constructor(private readonly eventPriceService: EventPriceService) {}

  @AllowUnauthorized()
  @Mutation(() => EventPriceModel)
  createEventPrice(
    @Args('createEventPriceInput') createEventPriceInput: CreateEventPriceInput,
  ) {
    return this.eventPriceService.createEventPrice(createEventPriceInput);
  }

  @AllowUnauthorized()
  @Query(() => [EventPriceModel])
  getEventPrices() {
    return this.eventPriceService.getEventPrices();
  }

  @AllowUnauthorized()
  @Query(() => EventPriceModel)
  getEventPrice(@Args('id') id: string) {
    return this.eventPriceService.getEventPrice(id);
  }

  @AllowUnauthorized()
  @Mutation(() => EventPriceModel)
  updateEventPrice(
    @Args('id') id: string,
    @Args('updateEventPriceInput') updateEventPriceInput: UpdateEventPriceInput,
  ) {
    return this.eventPriceService.updateEventPrice(id, updateEventPriceInput);
  }

  @AllowUnauthorized()
  @Mutation(() => EventPriceModel)
  deleteEventPrice(@Args('id') id: string) {
    return this.eventPriceService.deleteEventPrice(id);
  }
}
