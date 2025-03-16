import { NextFunction, Response } from 'express';
import { CustomError } from '../services/userService';

export const errorMiddleware = (err: unknown, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      message: err.message,
      code: err.statusCode,
    });
  }
  console.error('[ERROR]', err);
  res.status(500).json({
    message: 'Internal Server Error',
    code: 500,
  });
};
