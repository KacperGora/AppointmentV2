import { NextFunction, Request, Response } from 'express';
import { createDataBaseEvent, getDatabaseEvents, updateDatabaseEvent } from '../models/Event';
import { companyService } from '../services/companyService';
import { clientService } from '../services/clientServices';

export const eventsController = {
  getEvents: async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.id;
    try {
      const events = await getDatabaseEvents(userId);
      res.status(200).json(events);
    } catch (error) {
      next(error);
    }
  },

  createEvent: async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) {
      res.status(400).json({ message: 'Event data is required' });
      return;
    }
    if (!req.body.price) {
      res.status(400).json({ message: 'Price is required' });
      return;
    }

    try {
      await createDataBaseEvent({ ...req.body, userId: req.user.id });
      res.status(200).json({ message: 'Event created successfully' });
    } catch (error) {
      next(error);
    }
  },

  updateEvent: async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.id;
    const eventId = req.body.id;
    try {
      await updateDatabaseEvent({ ...req.body, userId, id: eventId });
      res.status(200).json({ message: 'Event updated successfully' });
    } catch (error) {
      next(error);
    }
  },

  getEventsFormOptions: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.id;
      const services = (await companyService.getDatabaseServices(userId, {})) || [];
      const clients = (await clientService.getClients(userId, {})) || [];
      res.status(200).json({ services, clients });
    } catch (error) {
      next(error);
    }
  },
};
