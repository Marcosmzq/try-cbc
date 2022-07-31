import { Dependencies, Injectable, BadRequestException } from '@nestjs/common';
import { UserInputError } from 'apollo-server-express';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignupUserInput } from './dto/signup-user.input';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { NodemailerService } from 'src/nodemailer/nodemailer.service';
import { AccessTokenPayload } from './dto/access-token-payload';
import { ChangePasswordInput } from './dto/change-password.input';
import { RecoveryPasswordWithTokenInput } from './dto/recovery-password-with-token.input';
@Injectable()
@Dependencies(UsersService, JwtService, NodemailerService)
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private nodemailerService: NodemailerService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UserInputError('Wrong credentials.');
    const verifyPassword: boolean = await bcrypt.compare(
      password,
      user.password,
    );
    if (!verifyPassword) {
      throw new UserInputError('Wrong credentials.');
    }
    if (user && verifyPassword) {
      const { password, ...result } = user;
      return result;
    }
  }

  async login(user: User) {
    const { username, email, id } = user;
    const payload: AccessTokenPayload = { username, email, id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  //Validate the sign up input
  async signup(registerUserInput: SignupUserInput) {
    let { email, username, password, confirmPassword } = registerUserInput;

    const checkIfTheEmailIsAvailable = await this.usersService.findByEmail(
      email,
    );
    if (checkIfTheEmailIsAvailable) {
      throw new UserInputError('The email is taken, please try with other.');
    }
    if (password !== confirmPassword) {
      throw new UserInputError("Password and confirm password don't match.");
    }

    const user = await this.usersService.create({
      email,
      username,
      password: await bcrypt.hash(password, 12),
    });

    const payload: AccessTokenPayload = { username, email, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async recoveryPasswordEmailLink(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user)
      throw new UserInputError('The email entered not belong to any user');

    const payload: AccessTokenPayload = {
      username: user.username,
      email: user.email,
      id: user.id,
    };
    const recoveryToken = this.jwtService.sign(payload);

    return this.nodemailerService.sendRecoveryPasswordEmail(
      email,
      user.username,
      recoveryToken,
    );
  }

  async changePasswordWithToken(
    changePasswordWithToken: RecoveryPasswordWithTokenInput,
  ) {
    let { access_token, newPassword, confirmNewPassword } =
      changePasswordWithToken;

    if (newPassword !== confirmNewPassword)
      throw new UserInputError(
        "New password and confirm new password don't match",
      );

    const decodeToken = await this.jwtService.decode(access_token);
    //@ts-ignore
    const user = await this.usersService.findOne(decodeToken.id);
    if (!user)
      throw new BadRequestException(
        'Invalid token, please solicit other link for recovery your password. ',
      );

    newPassword = await bcrypt.hash(newPassword, 12);

    await this.usersService.updatePassword(newPassword, user);

    return 'The password was changed successfully';
  }

  async changePassword(user: User, changePasswordInput: ChangePasswordInput) {
    let { newPassword, currentPassword, confirmNewPassword } =
      changePasswordInput;
    if (newPassword !== confirmNewPassword)
      throw new UserInputError(
        "New password and confirm new password don't match",
      );

    const verifyPassword = await bcrypt.compare(currentPassword, user.password);
    if (!verifyPassword)
      throw new UserInputError('You have entered your current password wrong');

    newPassword = await bcrypt.hash(newPassword, 12);

    await this.usersService.updatePassword(newPassword, user);

    return 'The password was changed successfully';
  }
}
