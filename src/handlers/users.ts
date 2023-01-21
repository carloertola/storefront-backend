import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User, UserStore } from '../models/user';
import verifyAuthToken from './authorizeMiddleware';

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  const users = await store.index();
  res.json(users);
};

const show = async (req: Request, res: Response) => {
  const user = await store.show(req.params.id);
  res.json(user);
};

const create = async (req: Request, res: Response) => {
  const user: User = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password
  }
  try {
    const newUser = await store.create(user);
    var token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as string);
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
    const user: User = await store.delete(req.params.id);
    res.json(user);
}

const authenticate = async (req: Request, res: Response) => {
  const user: User = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password
  };
  try {
    const u = await store.authenticate(
      user.firstName,
      user.lastName,
      user.password
    );
    var token = jwt.sign({ user: u }, process.env.TOKEN_SECRET as string);
    res.json(token);
  } catch (err) {
    res.status(401);
    res.json({ err });
  }
};

const user_routes = (app: express.Application) => {
  app.get('/users', verifyAuthToken, index);
  app.get('/users/:id', verifyAuthToken, show);
  app.post('/users', verifyAuthToken, create);
  app.delete('/users/:id', verifyAuthToken, destroy);
  app.post('/users/signin', authenticate);
};

export default user_routes;
