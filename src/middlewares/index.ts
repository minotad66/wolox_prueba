import { Request, Response, NextFunction } from 'express';

export const handlerError = async (error: any, req: Request, res: Response, next: NextFunction) => {
  const err = JSON.parse(JSON.stringify(error));
  const { statusCode } = err;
  res.status(statusCode || 500).json(err);
  next();
};
