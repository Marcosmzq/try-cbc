import { UserRole } from 'src/users/enums/userRole.enum';

export interface IdecodeToken {
  email: string;
  id: number;
  role: UserRole;
  username: string;
  iat: number;
  exp: number;
}
