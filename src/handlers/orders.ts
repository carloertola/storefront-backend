import express, { Request, Response } from 'express';
import { Order, OrderStore } from '../models/order';
import verifyAuthToken from './authorizeMiddleware';

const store = OrderStore;

const currentOrder = async (_req: Request, res: Response) => {};

const completedOrders = async (_req: Request, res: Response) => {};

const create = async (_req: Request, res: Response) => {};

const order_routes = (app: express.Application) => {
  app.get('/orders', verifyAuthToken, completedOrders);
  app.get('/orders/:id', verifyAuthToken, currentOrder);
  app.post('/orders/:id', verifyAuthToken, create);
};

export default order_routes;
