import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsString, IsInt } from 'class-validator';

@ObjectType()
export class AccessTokenPayload {
  @IsString()
  @Field(() => String)
  username: string;

  @IsString()
  @Field(() => String)
  email: string;

  @IsString()
  @Field(() => String)
  role: string;

  @IsInt()
  @Field(() => Int)
  id: number;
}
