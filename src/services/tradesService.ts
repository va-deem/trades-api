import { PrismaClient } from '@prisma/client';
import { ITrade } from '../types';

const prismaClient = new PrismaClient();

export const getTrades = async (
  userId: number | undefined,
  prisma = prismaClient
) => {
  if (userId) {
    return await prisma.trade.findMany({
      where: { creatorId: userId },
    });
  }
  return await prisma.trade.findMany();
};

export const createTrade = async (trade: ITrade, prisma = prismaClient) => {
  const { type, user, symbol, price, timestamp } = trade;

  return await prisma.trade.create({
    data: {
      type,
      creatorId: user.id,
      symbol,
      price,
      timestamp: new Date(timestamp),
    },
  });
};

export const deleteAllTrades = async (prisma = prismaClient) => {
  return await prisma.trade.deleteMany();
};

export const getPeakPrices = async (
  symbol: string | undefined,
  start: string | undefined,
  end: string | undefined,
  prisma = prismaClient
) => {
  if (!symbol || !start || !end) throw Error('Some parameter missed');

  const tradesWithSymbol = await prisma.trade.findMany({
    where: {
      symbol: {
        equals: symbol,
      },
    },
  });

  if (tradesWithSymbol.length === 0) {
    return { message: 'No trades with given symbol found' };
  }

  const tradesInPeriod = await prisma.trade.findMany({
    where: {
      AND: [
        {
          symbol: {
            equals: symbol,
          },
        },
        {
          timestamp: {
            gte: new Date(start),
          },
        },
        {
          timestamp: {
            lte: new Date(end),
          },
        },
      ],
    },
  });

  if (tradesInPeriod.length === 0) {
    return { message: 'No trades in given period found' };
  } else {
    const prices = tradesInPeriod.map((t) => t.price);

    // This should be revised if we need to process very big arrays
    const max = Math.max(...prices);
    const min = Math.min(...prices);

    return { symbol, max, min };
  }
};
