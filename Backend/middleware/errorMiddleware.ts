import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../services/userService';

export const errorMiddleware = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      message: err.message,
      code: err.code,
    });
  }
  res.status(500).json({
    message: 'Internal Server Error',
    code: 500,
  });
};
