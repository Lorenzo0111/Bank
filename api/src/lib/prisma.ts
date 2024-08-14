import { PrismaClient } from "database";

export const prisma = new PrismaClient({
  omit: {
    user: {
      password: true,
    },
  },
});
