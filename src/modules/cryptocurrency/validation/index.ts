import { BadRequest } from '../../../utils/errors';
import { criptoCurrecy } from './schema';

const responseValidation = (value: any) => {
  if (value['error']) {
    throw BadRequest(value.error.details[0].context.label);
  }
  return value.value;
};

export const validateCriptoCurrecy = (data: object) => {
  const value = criptoCurrecy.validate(data);
  const response = responseValidation(value);
  return response;
};
