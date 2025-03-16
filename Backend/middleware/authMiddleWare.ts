import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { SECRET_KEY } from '../config/env';

export interface User {
  id: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'NO_TOKEN' });
  }

  if (!SECRET_KEY) {
    console.error('SECRET_KEY is not defined');
    return res.status(500).json({ error: 'INTERNAL_SERVER_ERROR' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'INCORRECT_TOKEN' });
    }

    const payload = decoded as JwtPayload;

    if (!payload?.id) {
      return res.status(403).json({ error: 'INVALID_TOKEN_STRUCTURE' });
    }

    req.user = { id: payload.id } as User;
    next();
  });
};
