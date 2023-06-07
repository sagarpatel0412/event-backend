import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class SubscriptionForm {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
