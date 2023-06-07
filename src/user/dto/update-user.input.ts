import { InputType, Field } from '@nestjs/graphql';
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @IsEmail()
  @IsString()
  @Field(() => String)
  email: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  username: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  firstname: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  lastname: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  address1: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  address2: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  city: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  state: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  country: string;

  @IsNotEmpty()
  @IsBoolean()
  @Field(() => Boolean)
  status: boolean;
}
