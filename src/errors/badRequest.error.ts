import BasicError from './basic.error';

class BadRequestError extends BasicError {
  constructor(message: string = 'Bad request!') {
    super(message, 400);
  }
}

export default BadRequestError;
