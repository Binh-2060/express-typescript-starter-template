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

  loggers.error({
    message: err.message,
    method: req.method,
    path: req.path,
    params: req.params,
    query: req.query,
    status: res.statusCode,
    request_id: req['requestId'],
    origin: 'api',
  });

  const response: ResponseError = {
    message: message,
    items: null,
    status: res.statusCode,
    timestamp: FormatDatetime(new Date()),
  };
  return res.status(statusCode).json(response);
};
