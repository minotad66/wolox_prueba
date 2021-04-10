import { Request, Response, NextFunction } from 'express';
import { Id } from '../../../common/interface';
import { ISignIn } from '../interface';
import * as services from '../service';

export const signIn = async (req: { body: ISignIn }, res: Response, next: NextFunction) => {
  try {
    const response = await services.signIn(req.body);
    res.status(201).json(response);
  } catch (err) {
    next(err);
  }
};
