import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsBoolean, IsEmail } from 'class-validator';

@InputType()
export class UpdateSubscriptionFormInput {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  @Field(() => String)
  email: string;

  @IsNotEmpty()
  @IsBoolean()
  @Field(() => Boolean)
  status: boolean;

  @IsNotEmpty()
  @IsBoolean()
  @Field(() => Boolean)
  is_email_sent: boolean;
}
