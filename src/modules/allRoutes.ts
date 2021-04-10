import { Application } from 'express';

import { users } from './users/routes';
import { auth } from './auth/routes';

export const allRoutes = (app: Application) => {
  auth(app);
  users(app);
};
