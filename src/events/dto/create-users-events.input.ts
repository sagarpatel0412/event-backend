import { InputType, Field, Int } from '@nestjs/graphql';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

@InputType()
export class CreateUsersEventsInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  userId: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  eventId: string;

  @IsNotEmpty()
  @IsBoolean()
  @Field(() => Boolean)
  is_active: boolean;

  @IsNotEmpty()
  @IsInt()
  @IsNumber()
  @Field(() => Int)
  status_number: number;
}
