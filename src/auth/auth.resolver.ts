import { Dependencies, UseGuards, ValidationPipe } from '@nestjs/common';
import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { ChangePasswordInput } from './dto/change-password.input';
import { LoginUserResponse } from './dto/login-response';
import { LoginUserInput } from './dto/login-user.input';
import { RecoveryPasswordWithTokenInput } from './dto/recovery-password-with-token.input';
import { SignupUserInput } from './dto/signup-user.input';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

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

  @Mutation(() => String, { name: 'sendRecoveryPasswordEmail' })
  sendRecoveryPasswordEmail(@Args('email') email: string) {
    return this.authService.recoveryPasswordEmailLink(email);
  }

  @Mutation(() => String, { name: 'changePasswordWithToken' })
  changePasswordWithToken(
    @Args('recoveryPasswordWithToken')
    recoveryPasswordWithToken: RecoveryPasswordWithTokenInput,
  ) {
    return this.authService.changePasswordWithToken(recoveryPasswordWithToken);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => String, { name: 'changePassword' })
  changePassword(
    @CurrentUser() currentUser: User,
    @Args('changePasswordInput', new ValidationPipe())
    changePasswordInput: ChangePasswordInput,
  ) {
    return this.authService.changePassword(currentUser, changePasswordInput);
  }
}
