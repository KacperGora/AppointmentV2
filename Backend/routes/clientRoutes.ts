import { Router } from 'express';
import { clientControllers } from '../controllers/clientControllers';
import { authenticateToken } from '../middleware/authMiddleWare';

const clientRouter = Router();
const { addClient, deleteClient, getClients, getStatistics } = clientControllers;

clientRouter.get('/getClient', getClients);
clientRouter.get('/statistic', getStatistics);
clientRouter.post('/addClient', addClient);
clientRouter.post('/delete', deleteClient);

export default clientRouter;
