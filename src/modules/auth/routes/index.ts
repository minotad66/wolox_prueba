import * as controller from '../controller';

export const auth = (app: any) => {
  app.post('/auth/signin/', controller.signIn);
};
