import { Request, Response, NextFunction } from 'express';
import loggers from '../utils/loggers';
import * as prom from '../utils/prom-client';

export const ClientHandlers = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const originalSend = res.send;
  res.send = function (body: any) {
    // Log response information

    loggers.info({
      message: 'Request recieved',
      method: req.method,
      path: req.path,
      params: req.params,
      query: req.query,
      status: res.statusCode,
      body: req.body,
      request_id: req['requestId'],
      origin: 'api',
      response: JSON.parse(body),
    });

    // Call the original send function
    return originalSend.call(this, body);
  };

  next();
};
