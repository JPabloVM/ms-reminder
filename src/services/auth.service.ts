import fs from 'fs';
import * as argon2 from 'argon2';
import jwt from 'jsonwebtoken';

import UnauthorizedError from '../errors/unauthorized.error';
import UserModel from '../models/user.model';

export class AuthService {
  async login(email: string, password: string) {
    try {
      const user = await UserModel.findOne({ email: email });
      if (!user) {
        throw new UnauthorizedError('Invalid email or password');
      }

      const isValid = await argon2.verify(user.password, password);
      if (!isValid) {
        throw new UnauthorizedError('Invalid email or password');
      }

      const privateKey = fs.readFileSync('private.key');
      const token = jwt.sign({ data: user._id }, privateKey, { algorithm: 'RS256', expiresIn: '8h' });

      return { user, token };
    } catch (error) {
      throw error;
    }
  }
}
