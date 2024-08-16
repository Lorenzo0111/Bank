import { zValidator } from "@hono/zod-validator";
import { hashSync } from "@node-rs/argon2";
import { Hono } from "hono";
import { prisma } from "../lib/prisma";
import { type Variables, authenticated } from "../middlewares/auth";
import { updateCardSchema } from "../schemas";

export const cardsRoute = new Hono<{ Variables: Variables }>()
  .get("/", authenticated, async (ctx) => {
    const user = ctx.get("user");

    const cards = await prisma.card.findMany({
      where: { userId: user.id },
    });

    return ctx.json(cards);
  })
  .post("/new", authenticated, async (ctx) => {
    const user = ctx.get("user");

    let number: number;

    do {
      number = Math.floor(1000000000000000 + Math.random() * 9000000000000000);
    } while (
      (await prisma.card.findFirst({
        where: { number: number.toString() },
      })) !== null
    );

    const cvc = Math.floor(100 + Math.random() * 900);
    const pin = Math.floor(10000 + Math.random() * 90000);
    const expiry = new Date();
    expiry.setDate(28);
    expiry.setFullYear(expiry.getFullYear() + 5);

    await prisma.card.create({
      data: {
        number: number.toString(),
        cvc: hashSync(cvc.toString()),
        pin: hashSync(pin.toString()),
        userId: user.id,
        expiry,
        name: "New Card",
      },
    });

    return ctx.json({
      number,
      cvc,
      pin,
      expiry,
    });
  })
  .patch(
    "/:number",
    authenticated,
    zValidator("json", updateCardSchema),
    async (ctx) => {
      const user = ctx.get("user");
      const number = ctx.req.param("number");
      const body = ctx.req.valid("json");

      await prisma.card.update({
        where: { userId: user.id, number },
        data: body,
      });

      return ctx.json({ success: true });
    },
  )
  .delete("/:number", authenticated, async (ctx) => {
    const user = ctx.get("user");
    const number = ctx.req.param("number");

    await prisma.card.delete({
      where: { userId: user.id, number },
    });

    return ctx.json({ message: "Card deleted" });
  });
