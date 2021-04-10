import { BadRequest } from '../../../utils/errors';
import { user } from './schema';

const responseValidation = (value: any) => {
  if (value['error']) {
    throw BadRequest(value.error.details[0].context.label);
  }
  return value.value;
};

export const validateUser = (data: object) => {
  const value = user.validate(data);
  const response = responseValidation(value);
  return response;
};
