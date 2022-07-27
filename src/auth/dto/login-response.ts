import { Field, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class LoginUserResponse {
  @IsString()
  @Field(() => String)
  access_token: string;

  @Field(() => User)
  user: User;
}
