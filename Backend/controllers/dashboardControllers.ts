import { NextFunction, Request, Response } from 'express';
import { getDashboardDatabaseStats } from '../services/dashboardServices';

export const getDashboardStatistics = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user.id;
  const data = await getDashboardDatabaseStats();
  console.log('userId ->', data);
};
