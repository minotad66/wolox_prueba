import { Request, Response, NextFunction } from 'express';
import { iPayload } from 'modules/auth/interface';
import { Id } from '../../../common/interface';
import { IUsers } from '../interface';
import * as services from '../service';

export const userInformation = async (
  req: { user: iPayload },
  res: Response,
  next: NextFunction,
) => {
  try {
    const response = await services.userInformation(req.user);
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export const saveUsers = async (req: { body: IUsers }, res: Response, next: NextFunction) => {
  try {
    const response = await services.saveUsers(req.body);
    return res.status(201).json(response);
  } catch (err) {
    next(err);
  }
};

export const addCryptocurrencies = async (
  req: { body: { cryptocurrency: number[] }; user: iPayload },
  res: Response,
  next: NextFunction,
) => {
  try {
    const data: number[] = req.body.cryptocurrency;
    const response = await services.addCryptocurrencies(data, req.user);
    return res.status(201).json(response);
  } catch (err) {
    next(err);
  }
};
