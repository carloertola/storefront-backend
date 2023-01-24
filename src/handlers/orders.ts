import express, { Request, Response } from 'express';
import { Order, OrderProduct, OrderStore } from '../models/order';
import verifyAuthToken from '../middleware/authorize';

const store = new OrderStore;

const index = async (_req: Request, res: Response) => {
  const user_id = res.locals.jwtPayload.user.id; 
  const orders = await store.index(user_id);
  if(orders[0]) {
    res.json(orders);
  } else {
    res.json('No orders to be seen. Check back later');
  }
}

const show = async (req: Request, res: Response) => {
  const userId = res.locals.jwtPayload.user.id;
  const orderId = req.params.id;
  const order = await store.show(orderId, userId);
  if(order) {
    res.json(order);
  } else {
    res.json('The requested order does not yet exist or has been deleted');
  }
}

const create = async (req: Request, res: Response) => {
  const order: Order = {
    user_id: res.locals.jwtPayload.user.id,
    order_status: req.body.order_status
  }
  console.log(order.user_id);
  try {
    const newOrder = await store.create(order);
    res.json(newOrder);
  } catch (err) {
    res.status(401);
    res.json(`Could not create new order. Error: ${err}`);
  }
}

const update = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      id: req.params.id,
      user_id: res.locals.jwtPayload.user.id,
      order_status: 'complete'
    }
    const updatedOrder = await store.update(order);
    res.json(updatedOrder);
  } catch (err) {
    res.status(401);
    res.json(`Could not update order status. Error: ${err}`)
  }
}

const addProduct = async (req: Request, res: Response) => {
  const orderProduct: OrderProduct = {
    order_id: req.body.order_id,
    product_id: req.body.product_id,
    product_quantity: req.body.product_quantity
  }
  try {
    const newOrderProduct = await store.addProduct(orderProduct);
    res.json(newOrderProduct);
  } catch (err) {
    res.status(401);
    res.json(`Could not add product to order. Error: ${err}`);
  }
}

const currentOrder = async (_req: Request, res: Response) => {
  const userId = res.locals.jwtPayload.user.id;
  try {
    const currentOrder = await store.currentOrder(userId);
    if(currentOrder) {
      res.json(currentOrder);
    } else {
      res.json('No active orders');
    }
  } catch (err) {
    res.status(401);
    res.json(`Couldn't retrieve current order. Error: ${err}`)
  }
}

const completedOrders = async (_req: Request, res: Response) => {
  const user_id = res.locals.jwtPayload.user.id;
  try {
    const completeOrders = await store.completedOrders(user_id);
    if(completeOrders) {
      res.json(completeOrders);
    } else {
      res.json('No completed orders just yet')
    }
  } catch (err) {
    res.status(401);
    res.json(`Could not retrieve completed orders. Error: ${err}`);
  }
}

const order_routes = (app: express.Application) => {
  app.get('/orders', verifyAuthToken, index);
  app.get('/orders/:id', verifyAuthToken, show);
  app.post('/orders', verifyAuthToken, create);
  app.put('/orders/:id', verifyAuthToken, update);
  app.post('/orders/product', verifyAuthToken, addProduct);
  app.get('/ordersCurrent', verifyAuthToken, currentOrder);
  app.get('/ordersComplete', verifyAuthToken, completedOrders);
}

export default order_routes;
