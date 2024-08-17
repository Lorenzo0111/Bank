import { Hono } from "hono";
import { prisma } from "../../lib/prisma";
import { type Variables, authenticated } from "../../middlewares/auth";
import { savingsRoute } from "./savings";
import { transactionsRoute } from "./transactions";

export const balanceRoute = new Hono<{ Variables: Variables }>()
  .route("/transactions", transactionsRoute)
  .route("/savings", savingsRoute)
  .get("/snapshots", authenticated, async (ctx) => {
    const user = ctx.get("user");
    const limit = Number.parseInt(ctx.req.query("limit") || "25");
    const offset = Number.parseInt(ctx.req.query("offset") || "0");

    const snapshots = await prisma.balanceSnapshot.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        date: "desc",
      },
      take: Math.min(limit, 25),
      skip: offset,
    });

    return ctx.json(snapshots);
  });
