import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class BlogImage {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
