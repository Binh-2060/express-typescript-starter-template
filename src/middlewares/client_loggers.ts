import { Request, Response, NextFunction } from 'express';
import loggers from '../utils/loggers';
import * as prom from '../utils/prom-client';

export const ClientHandlers = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  loggers.info(
    `method=${req.method} path=${req.url} status=${res.statusCode} request_id=${req['requestId']}`,
    {
      origin: 'api',
    }
  );
  prom.default.httpRequestsTotal.inc({
    method: req.method,
    route: req.url,
    status: res.statusCode,
  });
  next();
};
