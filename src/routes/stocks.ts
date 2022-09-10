import express from 'express';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json({ test: 'success' });
});

export default router;
