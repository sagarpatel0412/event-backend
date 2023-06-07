import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class DataStatus {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
