import { Request, Response, NextFunction } from 'express';
import loggers from '../utils/loggers';

export const ClientHandlers = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  loggers.info(
    `method=${req.method} path=${req.url} status=${res.statusCode}`,
    {
      origin: 'api',
    }
  );
  next();
};
