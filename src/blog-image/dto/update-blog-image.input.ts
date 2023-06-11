import { InputType, Field } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UpdateBlogImageInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  image: string;

  @IsNotEmpty()
  @IsBoolean()
  @Field(() => Boolean)
  status: boolean;
}
