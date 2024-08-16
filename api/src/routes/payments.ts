import { zValidator } from "@hono/zod-validator";
import { verifySync } from "@node-rs/argon2";
import { Hono } from "hono";
import { prisma } from "../lib/prisma";
import { externalSchema } from "../schemas";

export const paymentsRoute = new Hono().post(
  "/external",
  zValidator("json", externalSchema),
  async (ctx) => {
    const body = ctx.req.valid("json");

    const target = await prisma.user.findUnique({
      where: {
        id: body.target,
      },
    });

    if (!target) return ctx.json({ message: "Target not found" }, 404);

    const card = await prisma.card.findFirst({
      where: {
        number: body.number,
      },
      include: {
        user: {
          select: {
            id: true,
            balance: true,
          },
        },
      },
      omit: {
        cvc: false,
        pin: true,
      },
    });

    if (!card) return ctx.json({ message: "Card not found" }, 404);

    const expiry = body.expiry.split("/");

    if (
      !verifySync(card.cvc, body.cvc) ||
      card.expiry.getMonth() + 1 !== Number.parseInt(expiry[0]) ||
      card.expiry.getFullYear() !== Number.parseInt(expiry[1])
    )
      return ctx.json({ message: "Invalid details" }, 401);

    if (card.user.balance.minus(body.amount).isNegative())
      return ctx.json({ message: "Insufficient balance" }, 402);

    const [transaction] = await prisma.$transaction([
      prisma.transaction.create({
        data: {
          sourceId: card.user.id,
          targetId: target.id,
          amount: body.amount,
          description: `[****${card.number.slice(
            -4,
          )}] External payment as ${body.ownerName}: ${body.description}`,
        },
      }),

      prisma.user.update({
        where: { id: card.user.id },
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

      prisma.balanceSnapshot.create({
        data: {
          userId: card.user.id,
          balance: card.user.balance.minus(body.amount),
        },
      }),

      prisma.balanceSnapshot.create({
        data: {
          userId: target.id,
          balance: target.balance.plus(body.amount),
        },
      }),
    ]);

    return ctx.json(transaction, 201);
  },
);
