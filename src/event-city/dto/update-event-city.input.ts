import { InputType, Field } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UpdateEventCityInput {
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
  @IsBoolean()
  @Field(() => Boolean)
  status: boolean;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  pincode: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  currency_code: string;
}
