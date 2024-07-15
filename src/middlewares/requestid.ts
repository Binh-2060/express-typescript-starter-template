import { v6 } from 'uuid';
import { Request, Response, NextFunction } from 'express';

export const UseRequestId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const uuid = v6();
  req['requestId'] = uuid;
  next();
};
