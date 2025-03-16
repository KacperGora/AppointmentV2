import { Request, Response, NextFunction } from 'express';
import { findUserByKey } from '../models/User';
import { handleError } from '../utils/authUtils';
import { errors } from '../config/errors';
import { clientService } from '../services/clientServices';
import { clientDatabaseStatistic } from '../models/Client';

export const clientControllers = {
  getClients: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId = req.user.id;
    const foundUser = await findUserByKey('id', userId);
    if (!foundUser) {
      next(errors.USER_NOT_FOUND);
      return;
    }
    try {
      const clients = (await clientService.getClients(userId, req.query)) || [];
      res.status(200).json(clients || []);
    } catch (error) {
      next(error);
    }
  },
  addClient: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name, last_name, phone_number, notes } = req.body;
    const userId = req.user.id;

    try {
      await clientService.addClient({ name, last_name, phone_number, userId, notes });
      res.status(200).send('Client added');
    } catch (error) {
      next(error);
    }
  },
  deleteClient: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { client_id } = req.body;

    try {
      await clientService.deleteClient(client_id);
      res.status(200).send('Client deleted');
    } catch (error) {
      next(error);
    }
  },
  getStatistics: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId = req.user.id;

    try {
      const data = await clientService.getStatistics(userId);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  },
};
