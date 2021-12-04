import { Injectable } from '@nestjs/common';
import { AuthenticationError } from 'apollo-server-express';
import { CreateTokenInput } from './dto/create-token.input';
import { IdecodeToken } from './types/decode-token';
const jwt = require('jsonwebtoken');

@Injectable()
export class JwtService {
  generateUserToken(createTokenInput: CreateTokenInput) {
    return jwt.sign(createTokenInput, process.env.JWT_SECRET, {
      expiresIn: createTokenInput.expiresIn,
    });
  }

  getToken(req: Request): string {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      throw new AuthenticationError('Authorization header must be provided');
    }
    const token = authHeader.split('Bearer ')[1];
    if (!token) {
      throw new AuthenticationError('Authorization header must be provided');
    }
    return token;
  }
  async decodeToken(token: string) {
    const decodeToken: IdecodeToken = await jwt.verify(
      token,
      process.env.JWT_SECRET,
    );
    if (decodeToken.exp * 1000 < Date.now()) {
      throw new AuthenticationError('Expired token');
    }
    return decodeToken;
  }
}
