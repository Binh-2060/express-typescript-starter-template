export class CustomError extends Error {
  statusCode: number;
  metadata: any;
  constructor(message, statusCode, metadata = {}) {
    super(message);
    this.statusCode = statusCode;
    this.metadata = metadata;
  }
}

export interface ResponseError {
  message: string;
  items: null;
  status: any;
  timestamp: string;
}
