import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class EventImage {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
