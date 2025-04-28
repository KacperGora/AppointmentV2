import { NextFunction, Request, Response } from 'express';
import { userService } from '../services/userService';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  try {
    const response = await userService.registerUser(username, password);
    res.status(201).json({ data: response });
  } catch (error: any) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  try {
    const response = await userService.loginUser(username, password);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  const { refresh_token } = req.body;
  try {
    const newAccessToken = await userService.refreshUserToken(refresh_token);
    res.json({ accessToken: newAccessToken });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.body;

  try {
    await userService.logoutUser(userId);
    res.status(200).send('User logged out');
  } catch (error) {
    next(error);
  }
};
