import morgan from 'morgan';
import 'dotenv/config.js';
import express from 'express';

morgan.token('body', (req: express.Request) => JSON.stringify(req.body));

export const requestLogger =
  process.env.NODE_ENV !== 'production'
    ? morgan(
        ':method :url :status :res[content-length] - :response-time ms :body'
      )
    : morgan('combined');

export const notFound = () => (req: express.Request, res: express.Response) => {
  res.status(404);

  if (req.accepts('json')) {
    res.send({
      error: 'Not found',
    });
  } else {
    res.type('txt').send('Not found');
  }
};
