import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import BadRequestError from '../errors/badRequest.error';
import BasicError from '../errors/basic.error';
import NotFound from '../errors/notFound.error';
import UnauthorizedError from '../errors/unauthorized.error';
import ValidationError from '../errors/validation.error';
import { Logger } from '../config/logger.config';

export interface AppError extends Error {
  status?: number;
  sendResponse?: (res: Response) => void;
}

function handleError(error: AppError, req: Request, res: Response, next: NextFunction) {
  if (error instanceof UnauthorizedError) {
    error.sendResponse?.(res);
  } else if (error instanceof NotFound) {
    error.sendResponse?.(res);
  } else if (error instanceof BadRequestError) {
    error.sendResponse?.(res);
  } else if (error instanceof ValidationError) {
    error.sendResponse?.(res);
  } else if (error instanceof BasicError || error.status === 500) {
    error.sendResponse?.(res);
  } else {
    res.status(error.status || 500).json({
      message: error.message || 'An unexpected error occurred.',
    });
  }
}

export default handleError;
