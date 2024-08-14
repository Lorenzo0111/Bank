import { zValidator } from "@hono/zod-validator";
import { hashSync, verifySync } from "@node-rs/argon2";
import { Hono } from "hono";
import { signToken } from "../lib/jwt";
import { prisma } from "../lib/prisma";
import { type Variables, authenticated } from "../middlewares/auth";
import { loginSchema, registerSchema } from "../schemas";

export const authRoute = new Hono<{ Variables: Variables }>()
  .post("/register", zValidator("json", registerSchema), async (ctx) => {
    const body = ctx.req.valid("json");

    try {
      const hashedPassword = hashSync(body.password);
      const user = await prisma.user.create({
        data: {
          ...body,
          password: hashedPassword,
        },
      });

      const token = await signToken(user.id);

      return ctx.json({
        token,
      });
    } catch (_) {
      return ctx.json(
        {
          error: "User already exists",
        },
        400,
      );
    }
  })
  .post("/login", zValidator("json", loginSchema), async (ctx) => {
    const body = ctx.req.valid("json");
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
      select: {
        id: true,
        password: true,
      },
    });

    if (!user || !user.password) {
      return ctx.json(
        {
          error: "Wrong email or password",
        },
        401,
      );
    }

    const passwordMatch = verifySync(user.password, body.password);

    if (!passwordMatch) {
      return ctx.json(
        {
          error: "Wrong email or password",
        },
        401,
      );
    }

    const token = await signToken(user.id);

    return ctx.json({
      token,
    });
  })
  .get("/me", authenticated, async (ctx) => {
    const user = ctx.get("user");
    return ctx.json(user);
  });
