import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class EventPrice {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
