import BasicError from './basic.error';

class UnauthorizedError extends BasicError {
  constructor(message: string = 'Unauthorized') {
    super(message, 401);
  }
}

export default UnauthorizedError;
