import express from 'express';

import {
  createTrade,
  deleteAllTrades,
  getPeakPrices,
  getTrades,
} from '../services/tradesService';

const router = express.Router();

router.get('/:symbol/price', async (req, res) => {
  const symbol = req.params.symbol as string;
  const start = req.query.start as string;
  const end = req.query.end as string;

  try {
    const data = await getPeakPrices(symbol, start, end);

    res.json(data);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get('/', async (req, res) => {
  const userId = req.query?.userId ? Number(req.query?.userId) : undefined;

  try {
    const data = await getTrades(userId);

    res.json(data);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const data = await createTrade(req.body);

    res.json(data);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.delete('/', async (_req, res) => {
  try {
    await deleteAllTrades();

    res.status(204).end();
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

export default router;
