import { Request, Response, NextFunction } from 'express';
import loggers from '../utils/loggers';

const getDurationInMilliseconds = (start: [number, number]) => {
  const NS_PER_SEC = 1e9;
  const NS_TO_MS = 1e6;
  const diff = process.hrtime(start);
  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};

export const ClientHandlers = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const originalSend = res.send;
  const start = process.hrtime();
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
      latency: `${getDurationInMilliseconds(start).toLocaleString()} ms`,
    });

    // Call the original send function
    return originalSend.call(this, body);
  };

  next();
};
