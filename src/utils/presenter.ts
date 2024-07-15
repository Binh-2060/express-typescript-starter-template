import { Response } from 'express';
import { GetCurrentDate } from './dayjs';

export const ResponseSuccess = (
  res: Response,
  statusCode: number,
  items: any,
  message: string
) => {
  return res.status(statusCode).json({
    status: 'success',
    message: message,
    items: items,
    timestamp: GetCurrentDate(),
  });
};

export const ResponseError = (
  res: Response,
  statusCode: number,
  message: string
) => {
  return res.status(statusCode).json({
    status: 'error',
    message: message,
    items: null,
    timestamp: GetCurrentDate(),
  });
};
