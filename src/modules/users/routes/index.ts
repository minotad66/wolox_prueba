import { validateToken } from '../../../middlewares';
import * as controller from '../controller';

export const users = (app: any) => {
  app.get('/user_information/', validateToken, controller.userInformation);
  app.post('/create_users/', controller.saveUsers);
  app.post('/add_cryptocurrencies/', validateToken, controller.addCryptocurrencies);
  
};
