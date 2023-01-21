import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const verifyAuthToken = (_req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader: string | undefined = _req.headers.authorization;
    const token: string = authorizationHeader
      ? authorizationHeader.split(' ')[1]
      : '';
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);

    next();
  } catch (error) {
    res.status(401);
  }
};

export default verifyAuthToken;
