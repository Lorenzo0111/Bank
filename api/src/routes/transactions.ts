import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { prisma } from "../lib/prisma";
import { type Variables, authenticated } from "../middlewares/auth";
import { transactionSchema } from "../schemas";

export const transactionsRoute = new Hono<{ Variables: Variables }>()
  .get("/", authenticated, async (ctx) => {
    const user = ctx.get("user");
    const sort = ctx.req.query("sort") === "asc" ? "asc" : "desc";
    const limit = Number.parseInt(ctx.req.query("limit") || "0");
    const offset = Number.parseInt(ctx.req.query("offset") || "0");

    const transactions = await prisma.transaction.findMany({
      where: {
        OR: [
          {
            sourceId: user.id,
          },
          {
            targetId: user.id,
          },
        ],
      },
      include: {
        source: {
          select: {
            id: true,
            name: true,
            username: true,
          },
        },
        target: {
          select: {
            id: true,
            name: true,
            username: true,
          },
        },
      },
      orderBy: {
        date: sort,
      },
      take: Math.min(limit, 50),
      skip: offset,
    });

    return ctx.json(transactions);
  })
  .post(
    "/new",
    zValidator("json", transactionSchema),
    authenticated,
    async (ctx) => {
      const user = ctx.get("user");
      const body = ctx.req.valid("json");

      const target = await prisma.user.findUnique({
        where: { id: body.target },
      });

      if (!target) return ctx.json({ message: "User not found" }, 404);

      if (user.balance.minus(body.amount).isNegative())
        return ctx.json({ message: "Insufficient balance" }, 403);

      const [transaction] = await prisma.$transaction([
        prisma.transaction.create({
          data: {
            sourceId: user.id,
            targetId: target.id,
            amount: body.amount,
            description: body.description,
          },
        }),

        prisma.user.update({
          where: { id: user.id },
          data: {
            balance: {
              decrement: body.amount,
            },
          },
        }),

        prisma.user.update({
          where: { id: target.id },
          data: {
            balance: {
              increment: body.amount,
            },
          },
        }),
      ]);

      return ctx.json(transaction, 201);
    },
  );
