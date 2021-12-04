import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { Request, ValidationPipe } from '@nestjs/common';
import { LoginUserInput } from './dto/login-user.input';
import { ChangePasswordInput } from './dto/change-password.input';
import { ChangeRoleInput } from './dto/change-role.input';
import { RecoveryPasswordInput } from './dto/reovery-password.input';
import { UserRole } from './enums/userRole.enum';
import { Roles } from 'src/docorators/roles.decorator';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => String, { name: 'createUser' })
  createUser(
    @Args('createUserInput', new ValidationPipe())
    createUserInput: CreateUserInput,
  ) {
    return this.usersService.create(createUserInput);
  }

  @Mutation(() => String, { name: 'loginUser' })
  loginUser(
    @Args('loginUserInput', new ValidationPipe())
    loginUserInput: LoginUserInput,
  ) {
    return this.usersService.login(loginUserInput);
  }

  @Query(() => [User], { name: 'findAllUsers' })
  @Roles(UserRole.ADMIN)
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'findUserByID' })
  @Roles(UserRole.ADMIN, UserRole.FREE_USER, UserRole.PREMIUM_USER)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => Boolean, { name: 'deleteUserByID' })
  @Roles(UserRole.ADMIN)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }

  @Mutation(() => User, { name: 'changePassword' })
  @Roles(UserRole.ADMIN, UserRole.FREE_USER, UserRole.PREMIUM_USER)
  changePassword(
    @Args('changePasswordInput', new ValidationPipe())
    changePasswordInput: ChangePasswordInput,
    @Context('req') req: Request,
  ) {
    return this.usersService.changePassword(changePasswordInput, req);
  }

  @Mutation(() => User, { name: 'changeUserRole' })
  changeRole(
    @Args('changeRoleInput', new ValidationPipe())
    changeRoleInput: ChangeRoleInput,
  ) {
    return this.usersService.changeRole(changeRoleInput);
  }

  @Mutation(() => Boolean, { name: 'forgotPassword' })
  forgotPassword(@Args('email') email: string) {
    return this.usersService.forgotPassword(email);
  }

  @Mutation(() => User, { name: 'recoveryPassword' })
  recoveryPassword(
    @Args('recoveryPasswordInput', new ValidationPipe())
    recoveryPasswordInput: RecoveryPasswordInput,
  ) {
    return this.usersService.recoveryPassword(recoveryPasswordInput);
  }

  @Mutation(() => Boolean, { name: 'upgradeUserAccount' })
  upgradeAccount(@Args('userID') userID: number) {
    return this.usersService.upgradeAccount(userID);
  }
}
