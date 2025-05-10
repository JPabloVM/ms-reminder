import { Response } from 'express';

class BasicError extends Error {
  public status: number;

  constructor(message: string = 'Internal server error!', status: number = 500) {
    super(message); // Passa a mensagem para a classe base Error
    this.status = status;

    // Corrige o protótipo para manter a cadeia de herança correta em TS
    Object.setPrototypeOf(this, BasicError.prototype);
  }

  sendResponse(res: Response): void {
    res.status(this.status).json({
      message: this.message,
      status: this.status,
    });
  }
}

export default BasicError;
