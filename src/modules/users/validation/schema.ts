import * as Joi from 'joi';

export const user = Joi.object({
  name: Joi.string().max(256).required().label('Ingrese el nombre '),
  lastName: Joi.string().max(256).required().label('Ingrese el apellido'),
  username: Joi.string().max(256).required().label('Ingrese el username'),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{8,50}$/)
    .required()
    .label('La contraseña debe tener por lo menos 8 caracteres'),
  currency: Joi.string().max(256).required().label('Ingrese su moneda preferida'),
});
