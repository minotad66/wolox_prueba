import { BadRequest } from '../../../utils/errors';
import { signIn } from './schema';

const responseValidation = (value: any) => {
  if (value['error']) {
    throw BadRequest(value.error.details[0].context.label);
  }
  return value.value;
};

export const validateSignIn = (data: object) => {
  const value = signIn.validate(data);
  const response = responseValidation(value);
  return response;
};
