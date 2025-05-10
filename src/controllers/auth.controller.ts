import { Request, Response, NextFunction } from 'express';
import { Logger } from '../config/logger.config';
import { AuthService } from '../services/auth.service';

const logger = new Logger('Auth');
const authService = new AuthService();

export class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await authService.login(req.body.email, req.body.password);
      res.status(200).json({ data: result });
    } catch (error) {
      logger.error(`login: ${error}`);
      next(error);
    }
  }
}
