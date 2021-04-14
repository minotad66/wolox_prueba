import { Request, Response, NextFunction } from 'express';
import { iPayload } from '../../auth/interface';
import { Pagination } from '../interface';
import * as services from '../service';

export const findListCryptocurrency = async (
  req: { user: iPayload; query: Pagination },
  res: Response,
  next: NextFunction,
) => {
  try {
    const response = await services.findListCryptocurrency(req.user, req.query);
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export const cryptocurrencyUser = async (
  req: { user: iPayload; query: Pagination },
  res: Response,
  next: NextFunction,
) => {
  try {
    const response = await services.cryptocurrencyUser(req.user, req.query);
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};
