import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { prisma } from "../../lib/prisma";
import { type Variables, authenticated } from "../../middlewares/auth";
import { createSavingSchema } from "../../schemas";

export const savingsRoute = new Hono<{ Variables: Variables }>()
  .get("/", authenticated, async (ctx) => {
    const user = ctx.get("user");

    const accounts = await prisma.savingAccount.findMany({
      where: {
        userId: user.id,
      },
    });

    return ctx.json(accounts);
  })
  .post(
    "/new",
    authenticated,
    zValidator("json", createSavingSchema),
    async (ctx) => {
      const user = ctx.get("user");
      const body = ctx.req.valid("json");

      const account = await prisma.savingAccount.create({
        data: {
          name: body.name,
          userId: user.id,
        },
      });

      return ctx.json(account);
    },
  );
