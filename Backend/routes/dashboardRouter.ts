import { Router } from 'express';
import { getDashboardStatistics } from '../controllers/dashboardControllers';

const dashboardRouter = Router();

dashboardRouter.get('/getStatisticData', getDashboardStatistics);

export default dashboardRouter;
