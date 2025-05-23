import express, { NextFunction, Request, Response } from 'express';
import { PORT } from './config/env';
import eventRouter from './routes/eventRoutes';
import clientRouter from './routes/clientRoutes';
import companyRouter from './routes/companyRouter';
import authRouter from './routes/authRoutes';
import { authenticateToken } from './middleware/authMiddleWare';
import { errorMiddleware } from './middleware/errorMiddleware';
import dashboardRouter from './routes/dashboardRouter';

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  next();
});

app.use('/auth', authRouter);

app.use(authenticateToken);

app.use('/event', eventRouter);
app.use('/client', clientRouter);
app.use('/company', companyRouter);
app.use('/dashboard', dashboardRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
      };
    }
  }
}
