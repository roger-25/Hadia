import express from 'express';
import cors from 'cors';
import requestId from 'express-request-id';
import { ProductAPI } from './api/index.js'
import { LogHandler, ErrorHandler } from './middlewares/index.js';

export function expressApp(app) {

  app.use(requestId());
  app.use(cors())
  app.use(express.json());

  app.get('/', (_req, res, _next) => {
    res.status(200).send({
      message: 'Products service is up and running'
    });
  });

  ProductAPI(app);

  app.use(LogHandler);
  app.use(ErrorHandler);

}