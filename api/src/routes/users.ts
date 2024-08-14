import { readFileSync } from "node:fs";
import { Hono } from "hono";
import { stream } from "hono/streaming";
import { resizeImage } from "../lib/images";
import { prisma } from "../lib/prisma";
import { type Variables, authenticated } from "../middlewares/auth";

export const usersRoute = new Hono<{ Variables: Variables }>()
  .get("/:id", authenticated, async (ctx) => {
    const id = ctx.req.param("id");

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        username: true,
      },
    });

    if (!user) {
      return ctx.json(
        {
          error: "User not found",
        },
        404,
      );
    }

    return ctx.json(user);
  })
  .get("/:id/image", authenticated, async (ctx) => {
    const quality = Number.parseInt(ctx.req.query("quality") || "80");
    const width = Number.parseInt(ctx.req.query("width") || "256");
    const id = ctx.req.param("id");

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        image: true,
      },
    });

    if (!user)
      return ctx.json(
        {
          error: "User not found",
        },
        404,
      );

    let resizedImage: Buffer;

    if (!user.image)
      resizedImage = await resizeImage(
        readFileSync("assets/default-avatar.png"),
        width,
        quality,
      );
    else
      resizedImage = await resizeImage(
        Buffer.from(user.image, "base64"),
        width,
        quality,
      );

    ctx.header("Content-Type", "image/webp");
    ctx.header("Content-Length", resizedImage.length.toString());
    ctx.header("Content-Disposition", `inline; filename="avatar.webp"`);
    ctx.header("Cache-Control", "public, max-age=604800, immutable");

    return stream(ctx, async (s) => {
      await s.write(resizedImage);
    });
  })
  .get("/username/:username", authenticated, async (ctx) => {
    const username = ctx.req.param("username");

    const user = await prisma.user.findUnique({
      where: {
        username: username.toLowerCase(),
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!user) {
      return ctx.json(
        {
          error: "User not found",
        },
        404,
      );
    }

    return ctx.json(user);
  })
  .get("/search", authenticated, async (ctx) => {
    const query = ctx.req.query("query");

    const users = await prisma.user.findMany({
      where: {
        username: {
          contains: query,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        name: true,
        username: true,
      },
    });

    return ctx.json(users);
  });
