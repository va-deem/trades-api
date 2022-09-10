import express from 'express';
import config from './config';
import { requestLogger, notFound } from './middlewares';
import stocksRouter from './routes/stocks';

const app = express();

app.use(express.json());
app.use(requestLogger);

app.use('/stocks', stocksRouter);

app.use(notFound());

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
