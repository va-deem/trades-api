// Mocking the Prisma Client using a singleton pattern.
// This will instantiate a Prisma client instance.

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;
