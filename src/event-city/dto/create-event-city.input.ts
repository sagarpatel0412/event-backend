import { InputType, Field, Int } from '@nestjs/graphql';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

@InputType()
export class CreateEventCityInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  event_time: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  event_date: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  city: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  country: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  state: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  address: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  cost: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  terms_condition: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  description: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  contact: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  longitude: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  latitude: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  pincode: string;

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
