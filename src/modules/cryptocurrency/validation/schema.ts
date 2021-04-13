import * as Joi from 'joi';

export const criptoCurrecy = Joi.array().items(
  Joi.object({
    id: Joi.string().max(80).required().label('Ingrese el id de la criptomoneda'),
    name: Joi.string().max(256).required().label('Ingrese el nombre de la criptomoneda'),
  }),
);
