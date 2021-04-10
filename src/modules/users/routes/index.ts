import * as controller from '../controller';

export const users = (app: any) => {
  app.get('/users/', controller.findUsers);
  app.get('/users/:id', controller.findOneUsers);
  app.post('/users/', controller.saveUsers);
  app.put('/users/:id', controller.updateUsers);
  app.delete('/users/:id', controller.removeUsers);
};
