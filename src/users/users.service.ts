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
    let res = '';
    if (user.role === UserRole.PREMIUM_USER) {
      res = 'Ya sos un usuario premiun, disfruta tu membresia.';
    }
    const checkIfUserBuyPremium =
      await this.checkoutService.checkIfUserHasApprovedPayments(user.id);
    if (!checkIfUserBuyPremium) {
      res = `No encontramos pagos aprobados realizados por vos, fijate si el pago se realizó correctamente, si crees que esto se trata de un error comunicate con nostros y solucionemos el problema. ${process.env.NODEMAILER_AUTH_USER} `;
    }
    if (
      checkIfUserBuyPremium &&
      user.role !== (UserRole.PREMIUM_USER || UserRole.ADMIN)
    ) {
      user.role = UserRole.PREMIUM_USER;
      await this.userRepository.save(user);
      res =
        'Ya actualizamos tu cuenta. Ahora sos un usuario premiun, felicitaciones!. Recordá que para ver reflejados los cambios debes cerrar sesion e ingresar nuevamente. ';
    }
    return res;
  }
}
