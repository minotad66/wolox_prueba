import * as Joi from 'joi';

export const signIn = Joi.object({
  userName: Joi.string().max(256).required().label('Ingrese el username'),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{8,50}$/)
    .required()
    .label('La contraseña debe tener por lo menos 8 caracteres'),
});
