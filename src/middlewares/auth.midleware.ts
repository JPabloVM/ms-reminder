import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import UnauthorizedError from '../errors/unauthorized.error';

export function authenticate(req: Request, res: Response, next: NextFunction) {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      throw new UnauthorizedError('Access unauthorized');
    }

    const token = authorization.replace('Bearer ', '');
    const publicKey = fs.readFileSync('public.key', 'utf-8');

    const decoded = jwt.verify(token, publicKey) as { id: string };

    res.locals.userId = decoded.id;

    next();
  } catch (error) {
    console.error(error);
    next(new UnauthorizedError('Access unauthorized'));
  }
}

export function authenticateInternal(req: Request, res: Response, next: NextFunction) {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      throw new UnauthorizedError('Access unauthorized');
    }

    const token = authorization.replace('Bearer ', '');

    if (token !== process.env.PRIVATE_KEY) {
      throw new UnauthorizedError();
    }

    next();
  } catch (error) {
    console.error(error);
    next(new UnauthorizedError('Access unauthorized'));
  }
}
