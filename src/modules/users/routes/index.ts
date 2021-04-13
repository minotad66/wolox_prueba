import { validateToken } from '../../../middlewares';
import * as controller from '../controller';

export const users = (app: any) => {
  app.get('/users_all/', validateToken, controller.findUsers);
  app.get('/users/', validateToken, controller.userInformation);
  app.post('/users/', controller.saveUsers);
  app.put('/users/:id', validateToken, controller.updateUsers);
  app.delete('/users/:id', validateToken, controller.removeUsers);
};
