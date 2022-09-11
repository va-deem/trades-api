import express from 'express';
import 'dotenv/config.js';
import { requestLogger, notFound } from './middlewares';
import stocksRouter from './routes/stocks';

const PORT = process.env.PORT || 1234;

const app = express();

app.use(express.json());
app.use(requestLogger);

app.use('/stocks', stocksRouter);

app.use(notFound());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
