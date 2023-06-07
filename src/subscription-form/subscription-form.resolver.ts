import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SubscriptionFormService } from './subscription-form.service';
import { SubscriptionForm } from './entities/subscription-form.entity';
import { CreateSubscriptionFormInput } from './dto/create-subscription-form.input';
import { UpdateSubscriptionFormInput } from './dto/update-subscription-form.input';
import { SubscriptionFormModel } from './model/subscription-form.model';
import { AllowUnauthorized } from 'src/auth/decorators/allow-unauthorized.decorator';

@Resolver(() => SubscriptionFormModel)
export class SubscriptionFormResolver {
  constructor(
    private readonly subscriptionFormService: SubscriptionFormService,
  ) {}

  @AllowUnauthorized()
  @Mutation(() => SubscriptionFormModel)
  createSubscription(
    @Args('createSubscriptionFormInput')
    createSubscriptionFormInput: CreateSubscriptionFormInput,
  ) {
    return this.subscriptionFormService.createSubscription(
      createSubscriptionFormInput,
    );
  }

  @AllowUnauthorized()
  @Query(() => [SubscriptionFormModel])
  getSubscriptions() {
    return this.subscriptionFormService.getSubscriptions();
  }

  @AllowUnauthorized()
  @Query(() => SubscriptionFormModel)
  getSubscription(@Args('id') id: string) {
    return this.subscriptionFormService.getSubscription(id);
  }

  @AllowUnauthorized()
  @Mutation(() => SubscriptionFormModel)
  updateSubscription(
    @Args('id') id: string,
    @Args('updateSubscriptionFormInput')
    updateSubscriptionFormInput: UpdateSubscriptionFormInput,
  ) {
    return this.subscriptionFormService.updateSubscription(
      id,
      updateSubscriptionFormInput,
    );
  }

  @AllowUnauthorized()
  @Mutation(() => SubscriptionFormModel)
  deleteSubscription(@Args('id') id: string) {
    return this.subscriptionFormService.deleteSubscription(id);
  }
}
