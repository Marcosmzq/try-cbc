import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthenticationError, UserInputError } from 'apollo-server-express';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { UserRole } from './enums/userRole.enum';
import { LoginUserInput } from './dto/login-user.input';
import { ChangePasswordInput } from './dto/change-password.input';
import { JwtService } from 'src/jwt/jwt.service';
import { IdecodeToken } from 'src/jwt/types/decode-token';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { ChangeRoleInput } from './dto/change-role.input';
import { NodemailerService } from 'src/nodemailer/nodemailer.service';
import { CheckoutService } from 'src/checkout/checkout.service';
import { RecoveryPasswordInput } from './dto/reovery-password.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly bcryptService: BcryptService,
    private readonly nodemailerService: NodemailerService,
    private readonly checkoutService: CheckoutService,
  ) {}

  async create(createUserInput: CreateUserInput) {
    const { email, username, password, confirmPassword } = createUserInput;
    const checkIfEmailIsAvailable = await this.userRepository.findOne({
      email,
    });
    if (checkIfEmailIsAvailable)
      throw new UserInputError('The email is not available');

    if (password !== confirmPassword)
      throw new UserInputError("Password don't match");
    const user = this.userRepository.create({
      username,
      email,
      password: await this.bcryptService.encryptPassword(password),
      role: UserRole.FREE_USER,
    });
    await this.userRepository.save(user);
    const userData = {
      email: user.email,
      id: user.id,
      role: user.role,
      username: user.username,
      expiresIn: '2 days',
    };
    return this.jwtService.generateUserToken(userData);
  }

  async login(loginUserInput: LoginUserInput) {
    const { email, password } = loginUserInput;
    const user = await this.userRepository.findOne({ email });
    if (!user) {
      throw new UserInputError('Wrong credentials.');
    }
    const verifyPassword = await this.bcryptService.verifyPassword(
      password,
      user.password,
    );
    if (!verifyPassword) {
      throw new UserInputError('Wrong credentials.');
    }
    const userData = {
      email: user.email,
      id: user.id,
      role: user.role,
      username: user.username,
      expiresIn: '2 days',
    };
    return this.jwtService.generateUserToken(userData);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne(id);
  }

  remove(id: number) {
    this.userRepository.delete(id);
    return true;
  }

  async changePassword(changePasswordInput: ChangePasswordInput, req: Request) {
    const { newPassword, currentPassword, confirmNewPassword } =
      changePasswordInput;

    if (newPassword !== confirmNewPassword)
      throw new UserInputError("Password don't match");
    const token = this.jwtService.getToken(req);
    const user: IdecodeToken = await this.jwtService.decodeToken(token);
    if (!user) throw new AuthenticationError('Token is invalid');

    const getUserFromDB = await this.userRepository.findOne(user.id);
    if (!getUserFromDB) throw new AuthenticationError('User not found');

    const verifyPassword = await this.bcryptService.verifyPassword(
      currentPassword,
      getUserFromDB.password,
    );
    if (!verifyPassword) {
      throw new UserInputError('Wrong credentials.');
    }
    getUserFromDB.password = await this.bcryptService.encryptPassword(
      newPassword,
    );
    return this.userRepository.save(getUserFromDB);
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

  async forgotPassword(email: string) {
    const users = await this.userRepository.find({
      where: {
        email,
      },
    });
    users.map((user) => {
      const userData = {
        email: user.email,
        id: user.id,
        role: user.role,
        username: user.username,
        expiresIn: '20 minutes',
      };
      const token = this.jwtService.generateUserToken(userData);
      this.nodemailerService.sendMail({
        from: process.env.NODEMAILER_AUTH_USER,
        to: user.email,
        html: `<div>
        <p>Hemos recibido una petición para restablecer la contraseña del usuario ${user.username}</p>
        <p>Si vos fuiste quien realizó esta petición entra al siguiente link, sino ignora este mensaje.</p>
        <p>El link será valido por 20 minutos, luego de eso deberás pedir otro.</p>
        <p>No compartas este link con nadie.</p>
        <h5>${process.env.CLIENT_URL}/recovery-password/${token}</h5> 
      </div>`,
        subject: 'tryCBC Restablecer contraseña',
      });
    });
    return true;
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
  async recoveryPassword(recoveryPasswordInput: RecoveryPasswordInput) {
    const { userToken, newPassword, confirmNewPassword } =
      recoveryPasswordInput;

    if (newPassword !== confirmNewPassword)
      throw new UserInputError("Password don't match");
    const identifyUser = await this.jwtService.decodeToken(userToken);
    const user = await this.userRepository.findOne(identifyUser.id);
    if (!user) throw new AuthenticationError('User not found');
    user.password = await this.bcryptService.encryptPassword(newPassword);
    return this.userRepository.save(user);
  }
}
