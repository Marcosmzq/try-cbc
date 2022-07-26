import { Dependencies, UseGuards, ValidationPipe } from '@nestjs/common';
import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginUserResponse } from './dto/login-response';
import { LoginUserInput } from './dto/login-user.input';
import { SignupUserInput } from './dto/signup-user.input';
import { GqlAuthGuard } from './guards/gql-auth.guard';

@Resolver()
@Dependencies(AuthService)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginUserResponse, { name: 'loginUser' })
  @UseGuards(GqlAuthGuard)
  login(
    @Args('loginUserInput', new ValidationPipe())
    loginUserInput: LoginUserInput,
    @Context() context,
  ) {
    return this.authService.login(context.user);
  }

  @Mutation(() => LoginUserResponse, { name: 'registerUser' })
  signup(
    @Args('registerUserInput', new ValidationPipe())
    registerUserInput: SignupUserInput,
  ) {
    return this.authService.signup(registerUserInput);
  }
}
