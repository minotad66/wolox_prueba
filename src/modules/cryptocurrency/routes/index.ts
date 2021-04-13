import { validateToken } from '../../../middlewares';
import * as controller from '../controller';

export const cryptocurrency = (app: any) => {
  app.get('/cryptocurrency/', validateToken, controller.findListCryptocurrency);
  app.post('/cryptocurrency/', validateToken, controller.saveCryptocurrency);
};
