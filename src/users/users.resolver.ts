import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UseGuards, ValidationPipe } from '@nestjs/common';
import { ChangeRoleInput } from './dto/change-role.input';
import { UserRole } from './enums/userRole.enum';
import { Roles } from '../docorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AdminAuthGuard } from 'src/auth/guards/admin-role.guard';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AdminAuthGuard)
  @Query(() => [User], { name: 'findAllUsers' })
  @Roles(UserRole.ADMIN)
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => User, { name: 'findUserByID' })
  @Roles(UserRole.ADMIN, UserRole.FREE_USER, UserRole.PREMIUM_USER)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean, { name: 'deleteUserByID' })
  @Roles(UserRole.ADMIN)
  removeUser(
    @Args('userIdToDelete', { type: () => Int }) userIdToDelete: number,
    @Context() context,
  ) {
    return this.usersService.remove(userIdToDelete, context.req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
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
