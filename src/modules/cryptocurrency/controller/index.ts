import { Request, Response, NextFunction } from 'express';
import { iPayload } from '../../auth/interface';
import { ICryptoCurrency } from '../interface';
import * as services from '../service';

export const findListCryptocurrency = async (
  req: { user: iPayload },
  res: Response,
  next: NextFunction,
) => {
  try {
    const response = await services.findListCryptocurrency(req.user);
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export const saveCryptocurrency = async (
  req: { body: { cryptocurrency: ICryptoCurrency[]; }; user: iPayload; },
  res: Response,
  next: NextFunction,
) => {
  try {
    const data:ICryptoCurrency[] = req.body.cryptocurrency;
    const response = await services.saveCryptocurrency(data, req.user);
    return res.status(201).json(response);
  } catch (err) {
    next(err);
  }
};
