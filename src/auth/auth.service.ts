import {
  Dependencies,
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
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
    const { email, username, confirmPassword } = registerUserInput;
    //Check if the email is taken
    const checkIfTheEmailIsAvailable = await this.usersService.findByEmail(
      email,
    );
    if (checkIfTheEmailIsAvailable)
      throw new UserInputError('The email is taken, please try with other.');

    //Check if the passwords matches
    if (registerUserInput.password !== confirmPassword)
      throw new UserInputError("Password don't match");

    //Hash the password
    const hashedPassword = await bcrypt.hash(registerUserInput.password, 12);

    //Create and save new user in the DB
    const user = await this.usersService.create({
      email,
      username,
      password: hashedPassword,
    });

    //Return the user info and an access token
    const { password, ...result } = user;
    const payload: AccessTokenPayload = { username, email, id: result.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: result,
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
    const { access_token, newPassword, confirmNewPassword } =
      changePasswordWithToken;

    //Check if the passwords matches
    if (newPassword !== confirmNewPassword)
      throw new UserInputError(
        "New password and confirm new password don't match",
      );

    //Identify the user from the token
    const decodeToken = await this.jwtService.decode(access_token);

    //Check if the user exists
    //@ts-ignore
    const user = await this.usersService.findOne(decodeToken.id);
    if (!user)
      throw new BadRequestException(
        'Invalid token, please solicit other link for recovery your password. ',
      );

    //Hash the new password before update the current
    const hashedNewPassword = await bcrypt.hash(newPassword, 12);

    //Update the password
    await this.usersService.updatePassword(hashedNewPassword, user);

    return 'The password was changed successfully';
  }

  async changePassword(
    decodeUserToken: any,
    changePasswordInput: ChangePasswordInput,
  ) {
    const { newPassword, currentPassword, confirmNewPassword } =
      changePasswordInput;
    //Check if the passwords matches
    if (newPassword !== confirmNewPassword)
      throw new UserInputError(
        "New password and confirm new password don't match",
      );

    //Get the user from the token
    const user = await this.usersService.findOne(decodeUserToken.userId);
    if (!user)
      throw new BadRequestException(
        'The user extracted from the token is invalid, please login again for refresh the token.',
      );

    //Verify if the password is correct
    const verifyPassword = await bcrypt.compare(currentPassword, user.password);
    if (!verifyPassword)
      throw new UserInputError('You have entered your current password wrong');

    //Hash the new password before update the current
    const hashedNewPassword = await bcrypt.hash(newPassword, 12);

    //Update the password
    await this.usersService.updatePassword(hashedNewPassword, user);

    return 'The password was changed successfully';
  }
}
