import * as Joi from 'joi';

export const criptoCurrecy = Joi.array().items(Joi.number().required());

export const pagination = Joi.object({
  orderBy: Joi.string().max(100).allow(''),
  page: Joi.number().min(0).required().label('Ingrese el número de página'),
  limit: Joi.number().min(1).max(25).optional().label('Ingrese el limite (nin:1, max:50)'),
});
