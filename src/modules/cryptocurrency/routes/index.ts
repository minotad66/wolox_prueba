import { validateToken } from '../../../middlewares';
import * as controller from '../controller';

export const cryptocurrency = (app: any) => {
  app.get('/list_cryptocurrency/', validateToken, controller.findListCryptocurrency);
  app.get('/cryptocurrency_user/', validateToken, controller.cryptocurrencyUser);
};
