import { PrismaClient } from "database";

export const prisma = new PrismaClient({
  omit: {
    user: {
      password: true,
      image: true,
    },
    card: {
      pin: true,
      cvc: true,
    },
  },
});
