import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthenticationError } from 'apollo-server-express';
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

  async findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne(id);
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({ email });
  }

  async remove(userIdToDelete: number) {
    return this.userRepository.delete(userIdToDelete);
  }

  async updatePassword(hashedNewPassword: string, user: User) {
    user.password = hashedNewPassword;
    return this.userRepository.save(user);
  }

  async changeRole(changeRoleInput: ChangeRoleInput) {
    const { userID, adminSecretKey, newRole } = changeRoleInput;
    if (adminSecretKey !== process.env.ADMIN_SECRET_KEY) {
      throw new AuthenticationError('Admin key invalid.');
    }
    const user = await this.userRepository.findOne(userID);
    if (!user) throw new AuthenticationError('User not found');
    user.role = newRole;
    return this.userRepository.save(user);
  }

  async upgradeAccount(user: User) {
    if (user.role === UserRole.PREMIUM_USER) {
      return 'You are already a premium user, enjoy your membership.';
    }
    const checkIfUserBuyPremium =
      await this.checkoutService.checkIfUserHasApprovedPayments(user.id);
    if (!checkIfUserBuyPremium) {
      return `We did not find approved payments associated with your account, try again later or if you think this is an error, send us an email. @${process.env.NODEMAILER_AUTH_USER} `;
    }
    if (
      checkIfUserBuyPremium &&
      user.role !== (UserRole.PREMIUM_USER || UserRole.ADMIN)
    ) {
      user.role = UserRole.PREMIUM_USER;
      await this.userRepository.save(user);
      return 'We update your role, congratulations you are a premium user now! Remember that you must log out and log in again to see the changes reflected.';
    }
  }
}
