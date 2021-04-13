import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const secret = process.env.JWT_SECRET || 'okhMC86gHYVH';

export const handlerError = async (error: any, req: Request, res: Response, next: NextFunction) => {
  const err = JSON.parse(JSON.stringify(error));
  const { statusCode } = err;
  res.status(statusCode || 500).json(err);
  next();
};

export const validateToken = async (
  req: { headers: any; user: any },
  res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers;
  const token = authorization.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, secret, (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
