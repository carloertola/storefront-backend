import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/product';
import verifyAuthToken from './authorizeMiddleware';

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  const products = await store.index();
  res.json(products);
};

const show = async (req: Request, res: Response) => {
  const product = await store.show(req.params.id);
  res.json(product);
};

const create = async (req: Request, res: Response) => {
  const product: Product = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category
  }
  try {
    const newProduct = await store.create(product);
    res.json(newProduct);
  } catch (err) {
    res.status(401);
    res.json(`You cannot create new products without signing in first ${err}`);
  }
};

const update = async (req: Request, res: Response) => {
  const product: Product = {
    id: req.params.id,
    name: req.body.name,
    price: req.body.price,
    category: req.body.category
  }
  try {
    const updatedProduct = await store.update(product);
    res.json(updatedProduct);
  } catch (err) {
    res.status(401);
    res.json(`You cannot update product with id ${req.params.id} unless you sign in Error: ${err}`)
  }
}

const destroy = async (req: Request, res: Response) => {
    const product: Product = await store.delete(req.params.id);
    res.json(product);
}

const product_routes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', verifyAuthToken, create);
  app.put('/products/:id', verifyAuthToken, update);
  app.delete('/products/:id', verifyAuthToken, destroy);
};

export default product_routes;
