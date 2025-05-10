import BasicError from './basic.error';

class NotFound extends BasicError {
  constructor(message: string = 'Data not identified!') {
    super(message, 404);
  }
}

export default NotFound;
