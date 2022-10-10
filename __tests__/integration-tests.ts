import { PrismaClient } from '@prisma/client';
import { TradeType } from '../src/types';
import {
  createTrade,
  deleteAllTrades,
  getPeakPrices,
  getTrades,
} from '../src/services/tradesService';

const prisma = new PrismaClient();

it('should get list of all existing trades', async () => {
  const INITIAL_TRADES_QUANTITY = 100;

  await getTrades(undefined);

  const allTrades = await prisma.trade.findMany();

  expect(allTrades).toBeInstanceOf(Array);
  expect(allTrades.length).toEqual(INITIAL_TRADES_QUANTITY);
});

it('should get list of all trades for exact userId', async () => {
  const CREATOR_ID = 5;

  await getTrades(CREATOR_ID);

  const allTradesByUserId = await prisma.trade.findMany({
    where: {
      creatorId: CREATOR_ID,
    },
  });

  expect(allTradesByUserId).toBeInstanceOf(Array);
  expect(
    allTradesByUserId.every((value) => value.creatorId === CREATOR_ID)
  ).toBeTruthy();
});

it('should create a new trade', async () => {
  const someTrade = {
    type: 'buy' as TradeType,
    user: {
      id: 11,
      name: 'Any',
    },
    symbol: 'WWW',
    price: 99999999.99,
    timestamp: '2022-09-11T19:20:30.45+03:00',
  };

  await createTrade(someTrade);

  const newTrade = await prisma.trade.findFirst({
    where: {
      price: someTrade.price,
    },
  });

  expect(newTrade).toHaveProperty('price', someTrade.price);
  expect(newTrade).toHaveProperty('symbol', someTrade.symbol);
  expect(newTrade).toHaveProperty('type', someTrade.type);
  expect(newTrade).toHaveProperty('creatorId', someTrade.user.id);
});

it('should get peak prices with given parameters', async () => {
  const TYPE = 'BTC';
  const START = '2020-09-11T14:20:30.000+03:00';
  const END = '2022-09-11T15:01:30.000+03:00';

  const peakPrice = await getPeakPrices(TYPE, START, END);

  expect(peakPrice).toHaveProperty('symbol', TYPE);
  expect(peakPrice).toHaveProperty('max');
  expect(peakPrice).toHaveProperty('min');
});

it('should return a message if no trades in given period found', async () => {
  const TYPE = 'BTC';
  const START = '2000-09-11T14:20:30.000+03:00';
  const END = '2001-09-11T15:01:30.000+03:00';

  const peakPrice = await getPeakPrices(TYPE, START, END);

  expect(peakPrice).toHaveProperty(
    'message',
    'No trades in given period found'
  );
});

it('should return a message if no trades with given symbol found', async () => {
  const TYPE = 'AAA';
  const START = '2020-09-11T14:20:30.000+03:00';
  const END = '2022-09-11T15:01:30.000+03:00';

  const peakPrice = await getPeakPrices(TYPE, START, END);

  expect(peakPrice).toHaveProperty(
    'message',
    'No trades with given symbol found'
  );
});

it('should throw an error if some parameter is undefined', () => {
  const TYPE = 'AAA';
  const START = '2020-09-11T14:20:30.000+03:00';

  expect(
    async () => await getPeakPrices(TYPE, START, undefined)
  ).rejects.toThrow('Some parameter missed');
});

it('should delete all trades', async () => {
  await deleteAllTrades();

  const allTrades = await prisma.trade.findMany();
  expect(allTrades).toBeInstanceOf(Array);
  expect(allTrades.length).toEqual(0);
});

afterAll(async () => {
  await prisma.trade.deleteMany();
  await prisma.$disconnect();
});
