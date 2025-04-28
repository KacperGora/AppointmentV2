import { createUser, findUserByKey, saveRefreshToken, logoutUser, changeUserPassword } from '../models/User';
import { compareUserPassword, hashUserPassword } from '../utils/authUtils';
import { generateAccessToken, generateRefreshToken } from '../utils/tokenUtils';
import { errors } from '../config/errors';
import jwt from 'jsonwebtoken';

export class CustomError extends Error {
  statusCode: number;
  code: string;

  constructor(message: string, statusCode: number, code: string) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
  }

  static fromKey(errorKey: keyof typeof errors): CustomError {
    const error = errors[errorKey];
    return new CustomError(error.message, error.status, error.code);
  }
}

export type LoginSuccess = {
  message: string;
  access_token: string;
  refresh_token: string;
  user: { id: string; username: string };
};
export type RegisterSuccess = {
  message: string;
  access_token: string;
  refresh_token: string;
  user: { login: string; id: string };
};

const { USER_ALREADY_EXISTS, USERNAME_AND_PASSWORD_REQUIRED, INTERNAL_SERVER_ERROR, INVALID_CREDENTIALS } = errors;
export const userService = {
  async registerUser(username: string, password: string): Promise<RegisterSuccess> {
    if (!username || !password) throw new CustomError(USERNAME_AND_PASSWORD_REQUIRED.message, 400, USERNAME_AND_PASSWORD_REQUIRED.code);

    const existingUser = await findUserByKey('username', username);
    if (existingUser) throw new CustomError(USER_ALREADY_EXISTS.message, 400, USER_ALREADY_EXISTS.code);

    const hashedPassword = await hashUserPassword(password);
    const newUser = await createUser({ username, password: hashedPassword });
    const token = generateAccessToken(newUser.id);
    const refreshToken = generateRefreshToken(newUser.id);

    try {
      await saveRefreshToken(newUser.id, refreshToken);
    } catch (error) {
       throw CustomError.fromKey('INTERNAL_SERVER_ERROR');
    }

    return {
      message: 'User created successfully',
      user: { login: newUser.username, id: newUser.id },
      access_token: token,
      refresh_token: refreshToken,
    };
  },

  async loginUser(username: string, password: string): Promise<LoginSuccess> {
    const user = await findUserByKey('username', username);
    if (!user) throw new CustomError(INVALID_CREDENTIALS.message, 401, INVALID_CREDENTIALS.code);

    const passwordMatch = await compareUserPassword(password, user.password as string);
    if (!passwordMatch) throw CustomError.fromKey('INVALID_CREDENTIALS');
    const token = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    try {
      await saveRefreshToken(user.id, refreshToken);
    } catch (error) {
      throw CustomError.fromKey('');
    }

    return {
      message: 'Login successful',
      access_token: token,
      refresh_token: refreshToken,
      user: { id: user.id, username: user.username },
    };
  },

  async refreshUserToken(refreshToken: string) {
    try {
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY as string) as jwt.JwtPayload;
      const user = await findUserByKey('id', decoded.id);
      if (!user || user.refresh_token !== refreshToken) throw CustomError.fromKey('INVALID_CREDENTIALS');

      return generateAccessToken(user.id);
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new CustomError('Refresh token expired', 401, 'TOKEN_EXPIRED');
      }
      throw CustomError.fromKey('INVALID_CREDENTIALS');
    }
  },
  async logoutUser(userId: string) {
    try {
      await logoutUser(userId);
    } catch (error) {
      throw CustomError.fromKey('INTERNAL_SERVER_ERROR');
    }
  },
  async changePassword(userId: string, newPassword: string) {
    try {
      await changeUserPassword(userId, newPassword);
    } catch (error) {
      throw CustomError.fromKey('INVALID_CREDENTIALS');
    }
  },
};
