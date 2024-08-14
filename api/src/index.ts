import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono().use(
  cors({
    origin: "*",
    allowHeaders: ["Authorization", "Content-Type", "User-Agent"],
    allowMethods: ["POST", "GET", "OPTIONS", "PUT", "DELETE", "PATCH"],
    exposeHeaders: ["Content-Length", "Content-Type", "Content-Disposition"],
    maxAge: 600,
  }),
);

serve(app, (info) => {
  console.log(`[Server] Listening on ${info.address}:${info.port}`);
});

export type AppType = typeof app;
