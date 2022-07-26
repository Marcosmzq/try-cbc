import { Dependencies, Injectable } from '@nestjs/common';
import { UserInputError } from 'apollo-server-express';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignupUserInput } from './dto/signup-user.input';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
@Dependencies(UsersService, JwtService)
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
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
    return {
      access_token: this.jwtService.sign({ username, email, id }),
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
    return {
      access_token: this.jwtService.sign({ username, email, id: result.id }),
      user: result,
    };
  }
}
