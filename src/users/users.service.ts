import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthenticationError, UserInputError } from 'apollo-server-express';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { UserRole } from './enums/userRole.enum';
import { ChangeRoleInput } from './dto/change-role.input';
import { CheckoutService } from '../checkout/checkout.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly checkoutService: CheckoutService,
  ) {}

  async create(createUserInput: CreateUserInput) {
    const newUser = this.userRepository.create(createUserInput);

    return this.userRepository.save(newUser);
  }

  async userIsAdmin(user_id: number) {
    const user = await this.userRepository.findOne(user_id);
    if (!user) throw new BadRequestException('User id provided is wrong');
    const { password, ...result } = user;

    return {
      isAdmin: user.role === UserRole.ADMIN,
      user: result,
    };
  }

  async findAll() {
    return this.userRepository.find();
  }

  //TODO: Este metodo solo puede ser accedido si el usuario es admin
  //TODO: Crear otro metodo, getCurrentUser, que busca el usuario del contexto.
  findOne(id: number) {
    return this.userRepository.findOne(id);
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({ email });
  }

  async remove(userIdToDelete: number, userIdFromCtx: number) {
    const { isAdmin } = await this.userIsAdmin(userIdFromCtx);
    if (!isAdmin) throw new UnauthorizedException('ADMIN role is required');
    this.userRepository.delete(userIdToDelete);
    return true;
  }

  async updatePassword(hashedNewPassword: string, user: User) {
    user.password = hashedNewPassword;
    return this.userRepository.save(user);
  }

  async changeRole(changeRoleInput: ChangeRoleInput) {
    const { userID, adminSecretKey, newRole } = changeRoleInput;
    if (adminSecretKey !== process.env.ADMIN_SECRET_KEY) {
      throw new AuthenticationError('You can not do this action.');
    }
    const user = await this.userRepository.findOne(userID);
    if (!user) throw new AuthenticationError('User not found');
    user.role = newRole;
    return this.userRepository.save(user);
  }

  async upgradeAccount(userID: number) {
    const checkIfUserBuyPremium =
      await this.checkoutService.checkIfUserHasApprovedPayments(userID);
    const user = await this.userRepository.findOne(userID);
    if (!checkIfUserBuyPremium || !user) {
      return false;
    }
    if (checkIfUserBuyPremium) {
      user.role = UserRole.PREMIUM_USER;
      await this.userRepository.save(user);
      return true;
    }
  }
}
