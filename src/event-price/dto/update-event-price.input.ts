import { InputType, Field } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UpdateEventPriceInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  event_price: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  discount: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  currency_code: string;

  @IsNotEmpty()
  @IsBoolean()
  @Field(() => Boolean)
  status: boolean;
}
