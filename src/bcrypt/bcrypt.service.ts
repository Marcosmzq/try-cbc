import { Injectable } from '@nestjs/common';
const bcrypt = require('bcryptjs');

@Injectable()
export class BcryptService {
  encryptPassword(password: string) {
    return bcrypt.hash(password, 12);
  }
  verifyPassword(password: string, userPassword: string) {
    return bcrypt.compare(password, userPassword);
  }
}
