import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { allRoutes } from './modules/allRoutes';
import { handlerError } from './middlewares';

const app = express();
createConnection();

app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

export const initApp = () => {
  allRoutes(app);
  app.use(handlerError);
  return app;
};
