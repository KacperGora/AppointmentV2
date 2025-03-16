import { Router } from 'express';
import { register, login, refreshToken, logout } from '../controllers/authcontrollers';

const authRouter = Router();
authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);

authRouter.post('/refresh-token', refreshToken);
export default authRouter;
