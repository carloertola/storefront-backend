import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader: string | undefined = req.headers.authorization;
    const token: string = authorizationHeader
      ? authorizationHeader.split(' ')[1] : '';
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);
    console.log(decoded);
    res.locals.jwtPayload = decoded;
    next();
  } catch (error) {
    res.status(401);
    res.json('You need to be a signed in user to create a product');
  }
};

export default verifyAuthToken;
