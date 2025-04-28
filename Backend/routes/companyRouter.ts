import { Router } from 'express';
import { addService, deleteService, getEventsIncome, getServices } from '../controllers/companyControllers';

const companyRouter = Router();

companyRouter.get('/calculateIncome', getEventsIncome);
companyRouter.get('/getServices', getServices);
companyRouter.post('/addService', addService);
companyRouter.post('/deleteService', deleteService);

export default companyRouter;
