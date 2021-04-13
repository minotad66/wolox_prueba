import { Request, Response, NextFunction } from 'express';
import { iPayload } from 'modules/auth/interface';
import { Id } from '../../../common/interface';
import { IUsers } from '../interface';
import * as services from '../service';

export const findUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response: any = await services.findUsers();
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

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

export const updateUsers = async (
  req: { body: IUsers; params: Id },
  res: Response,
  next: NextFunction,
) => {
  try {
    const response = await services.updateUsers(req.body, req.params);
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export const removeUsers = async (req: { params: Id }, res: Response, next: NextFunction) => {
  try {
    const response = await services.removeUsers(req.params);
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};
