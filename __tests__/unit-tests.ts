// Unit tests for single trade creation

import { prismaMock } from '../prismaMock';
import { createTrade } from '../src/services/tradesService';
import { ITrade, ITradeResponse, TradeType } from '../src/types';

test('should create new trade ', async () => {
  const trade = {
    type: 'buy' as TradeType,
    user: {
      id: 12,
      name: 'Any',
    },
    symbol: 'ABX',
    price: 134.26,
    timestamp: '2022-09-11T19:20:30.45+03:00',
  };

  const tradeResponse: ITradeResponse = {
    id: 1,
    type: 'buy',
    creatorId: 12,
    symbol: 'ABX',
    price: 134.26,
    timestamp: new Date('2022-09-11T16:20:30.450Z'),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  prismaMock.trade.create.mockResolvedValue(tradeResponse);

  await expect(createTrade(trade, prismaMock)).resolves.toEqual(tradeResponse);
});

test('should reject on error', async () => {
  type brokenTrade = Omit<ITrade, 'user'>;

  const trade: brokenTrade = {
    type: 'buy' as TradeType,
    symbol: 'ABX',
    price: 134.26,
    timestamp: '2022-09-11T19:20:30.45+03:00',
  };

  prismaMock.trade.create.mockRejectedValue(new Error());

  await expect(createTrade(trade as ITrade, prismaMock)).rejects.toBeInstanceOf(
    Error
  );
});
