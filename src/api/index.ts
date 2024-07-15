import { Router, Request, Response, NextFunction } from 'express';
import { FormatDatetime } from '../utils/dayjs';
import UserRouter from './users/router';

const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({
    status: 200,
    appname: 'Express-TypeScript-Starter-App',
    timestamp: FormatDatetime(new Date()),
    message: 'Welcome to Express Typesctipt Starter App',
    request_id: req['requestId'],
  });
});

router.use('/users', UserRouter);

export default router;
