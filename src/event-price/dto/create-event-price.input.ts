import { InputType, Field, Int } from '@nestjs/graphql';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

@InputType()
export class CreateEventPriceInput {
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

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  events_id: string;

  @IsNotEmpty()
  @IsInt()
  @IsNumber()
  @Field(() => Int)
  status_number: number;
}
