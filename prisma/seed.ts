import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const generateUsers = () =>
  Array.from({ length: 50 }).map(() => ({
    name: faker.name.firstName(),
  }));

const generateTrades = (usersIds: number[]) => {
  const types = ['buy', 'sell'];
  const symbols = ['AC', 'ABX', 'BTC', 'USD'];

  return Array.from({ length: 100 }).map(() => {
    const randomTypeNumber = faker.datatype.number({
      min: 0,
      max: types.length - 1,
    });

    const randomUserNumber = faker.datatype.number({
      min: 0,
      max: usersIds.length - 1,
    });

    const randomSymbol = faker.datatype.number({
      min: 0,
      max: symbols.length - 1,
    });

    return {
      type: types[randomTypeNumber],
      creatorId: usersIds[randomUserNumber],
      symbol: symbols[randomSymbol],
      price: faker.datatype.float({ min: 10, max: 1000, precision: 0.01 }),
      timestamp: faker.date.between(
        '2020-01-01T00:00:00.000Z',
        '2022-09-11T00:00:00.000Z'
      ),
    };
  });
};

const prisma = new PrismaClient();

export const main = async () => {
  try {
    await prisma.user.createMany({ data: generateUsers() });
    const users = await prisma.user.findMany();
    await prisma.trade.createMany({
      data: generateTrades(users.map((u) => u.id)),
    });
  } catch (error) {
    process.exit(1);
  } finally {
    prisma.$disconnect();
  }
};

main();
