import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/product';
import verifyAuthToken from '../middleware/authorize';

const store = new ProductStore();

// checks if products exist and sends appropriate response
const index = async (_req: Request, res: Response) => {
  const products = await store.index();
  if(products[0]) {
    res.json(products);
  } else {
    res.json('No products available. Please check back later');
  }
};

// retrieves id from user request and responds with the product if it exists
const show = async (req: Request, res: Response) => {
  const product = await store.show(req.params.id);
  if(product) {
    res.json(product);
  } else {
    res.json('The requested product does not yet exist or has been deleted');
  }
};

// makes sure all details are provided before calling create method
const create = async (req: Request, res: Response) => {
  const product: Product = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category
  }
  if(req.body.name && req.body.price && req.body.category) {
    try {
      const newProduct = await store.create(product);
      res.json(newProduct);
    } catch (err) {
      res.status(401);
      res.json(`Cannot create new product. Error: ${err}`);
    }
  } else {
    res.json('You need to provide all details about the product to create it');
  }
};

const update = async (req: Request, res: Response) => {
  const product: Product = {
    id: req.params.id,
    name: req.body.name,
    price: req.body.price,
    category: req.body.category
  }
  if(req.params.id && req.body.name && req.body.price && req.body.category) {
    try {
      const updatedProduct = await store.update(product);
      res.json(updatedProduct);
    } catch (err) {
      res.status(401);
      res.json(`You cannot update product with id ${req.params.id} unless you sign in Error: ${err}`)
    }
  } else {
    res.json('Please provide all the details of the product that needs to be updated')
  }
}

const destroy = async (req: Request, res: Response) => {
  if(req.params.id) {
    const product: Product = await store.delete(req.params.id);
    if(product) {
      res.json(product);
    } else {
      res.json('Product does not exist yet or has already been deleted');
    }
  } else {
    res.json('Please provide the id of the product you want to delete')
  }
}

const product_routes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', verifyAuthToken, create);
  app.put('/products/:id', verifyAuthToken, update);
  app.delete('/products/:id', verifyAuthToken, destroy);
};

export default product_routes;
