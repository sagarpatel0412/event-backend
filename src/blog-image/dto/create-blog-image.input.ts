import { InputType, Int, Field } from '@nestjs/graphql';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

@InputType()
export class CreateBlogImageInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  image: string;

  @IsNotEmpty()
  @IsBoolean()
  @Field(() => Boolean)
  status: boolean;

  @IsNotEmpty()
  @IsInt()
  @IsNumber()
  @Field(() => Int)
  status_number: number;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  post_id: string;
}
