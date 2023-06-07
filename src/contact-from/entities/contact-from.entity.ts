import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ContactFrom {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
