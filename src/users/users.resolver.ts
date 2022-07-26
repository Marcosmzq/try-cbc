import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { ValidationPipe } from '@nestjs/common';
import { ChangeRoleInput } from './dto/change-role.input';
import { UserRole } from './enums/userRole.enum';
import { Roles } from '../docorators/roles.decorator';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

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

  @Mutation(() => User, { name: 'changeUserRole' })
  changeRole(
    @Args('changeRoleInput', new ValidationPipe())
    changeRoleInput: ChangeRoleInput,
  ) {
    return this.usersService.changeRole(changeRoleInput);
  }

  @Mutation(() => Boolean, { name: 'upgradeUserAccount' })
  upgradeAccount(@Args('userID') userID: number) {
    return this.usersService.upgradeAccount(userID);
  }
}
