import loggers from '../utils/loggers';
import { Request, Response, NextFunction } from 'express';
import { CustomError, ResponseError } from '../models/response';
import { FormatDatetime } from '../utils/dayjs';

export const ErrorHandlers = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = res.statusCode || 500;
  let message = null;
  if (err instanceof CustomError) {
    statusCode = err.statusCode;
    message = err.message;
  } else {
    statusCode = 500;
    message = 'Interval error';
  }

  loggers.error(
    `method=${req.method} path=${req.url} status=${statusCode} request_id=${req['requestId']} err=${message}`,
    { origin: 'api' }
  );

  const response: ResponseError = {
    message: message,
    items: null,
    status: res.statusCode,
    timestamp: FormatDatetime(new Date()),
  };
  return res.status(statusCode).json(response);
};
