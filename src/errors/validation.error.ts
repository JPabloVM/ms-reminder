import BadRequest from './badRequest.error';

class ValidationError extends BadRequest {
  constructor(error: any) {
    const errorsMessages = Object.values(error.details)
      .map((errorMessage: any) => errorMessage.message)
      .join('; ');
    super(`The following error have been identified: ${errorsMessages}`);
  }
}

export default ValidationError;
