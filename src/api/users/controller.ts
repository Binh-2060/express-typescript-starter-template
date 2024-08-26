import { Request, Response, NextFunction } from 'express';
import * as services from './service';
import { ResponseError, ResponseSuccess } from '../../utils/presenter';

export const GetUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await services.GetUserService();
    if (users instanceof Error) {
      return ResponseError(res, 500, users.message);
    }

    return ResponseSuccess(res, 200, users, 'SUCCESS');
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const CreateUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username } = req.body;
    const result = await services.CreateUserService(username);
    if (result instanceof Error) {
      return ResponseError(res, 500, result.message);
    }

    return ResponseSuccess(res, 200, result, 'SUCCESS');
  } catch (error) {
    console.error(error);
    next(error);
  }
};
