import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UseGuards, ValidationPipe } from '@nestjs/common';
import { ChangeRoleInput } from './dto/change-role.input';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AdminAuthGuard } from 'src/auth/guards/admin-role.guard';
import { CurrentUser } from './decorators/current-user.decorator';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AdminAuthGuard)
  @Query(() => [User], { name: 'findAllUsers' })
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AdminAuthGuard)
  @Query(() => User, { name: 'findUserByID' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => User, { name: 'findCurrentUser' })
  findCurrentUser(@CurrentUser() currentUser: User) {
    return currentUser;
  }

  @UseGuards(AdminAuthGuard)
  @Mutation(() => Boolean, { name: 'deleteUserByID' })
  removeUser(
    @Args('userIdToDelete', { type: () => Int }) userIdToDelete: number,
  ) {
    return this.usersService.remove(userIdToDelete);
  }

  @Mutation(() => User, { name: 'changeUserRole' })
  changeRole(
    @Args('changeRoleInput', new ValidationPipe())
    changeRoleInput: ChangeRoleInput,
  ) {
    return this.usersService.changeRole(changeRoleInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => String, { name: 'upgradeCurrentUserAccount' })
  upgradeAccount(@CurrentUser() currentUser: User) {
    return this.usersService.upgradeAccount(currentUser);
  }
}
