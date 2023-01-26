import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User, UserStore } from '../models/user';
import verifyAuthToken from '../middleware/authorize';

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (err) {
    res.status(401);
    res.json(`Could not display users ${err}`);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const user = await store.show(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(401);
    res.json(`Could not show specified user ${err}`);
  }
};

const create = async (req: Request, res: Response) => {
  const user: User = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password
  }
  if(req.body.firstName && req.body.lastName && req.body.password) {
    try {
      const newUser = await store.create(user);
      const payload = {
        id: newUser.id,
        firstName: newUser.firstName
      }
      var token = jwt.sign({ user: payload }, process.env.TOKEN_SECRET as string);
      res.json(token);
    } catch (err) {
      res.status(400);
      res.json(err);
    }
  } else {
    res.json('Please provide all your sign up details');
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const user: User = await store.delete(req.params.id);
    if(user) {
      res.json(user);
    } else {
      res.json('Specified user has already been deleted or does not exist yet');
    }
  } catch (err) {
    res.status(401);
    res.json(`Could not delete user ${err}`);
  }
}

const authenticate = async (req: Request, res: Response) => {
  const user: User = {
    id: req.body.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password
  }
  if(req.body.firstName && req.body.lastName && req.body.password) {
    try {
      const u = await store.authenticate(user);
      if(u !== null) {
        const payload = {
          id: u.id,
          firstName: u.firstName
        }
        var token = jwt.sign({ user: payload }, process.env.TOKEN_SECRET as string);
        res.json(token);
      } else {
        res.json('Sign in failed! Please provide valid credentials');
      }
    } catch (err) {
      res.status(401);
      res.json({ err });
    }
  } else {
    res.json('Please provide all your login information');
  }
};

const user_routes = (app: express.Application) => {
  app.get('/users', verifyAuthToken, index);
  app.get('/users/:id', verifyAuthToken, show);
  app.post('/users', create);
  app.delete('/users/:id', verifyAuthToken, destroy);
  app.post('/users/signin', authenticate);
};

export default user_routes;
