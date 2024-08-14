import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { authRoute } from "./routes/auth";
import { transactionsRoute } from "./routes/transactions";
import { usersRoute } from "./routes/users";

const app = new Hono()
  .use(
    cors({
      origin: "*",
      allowHeaders: ["Authorization", "Content-Type", "User-Agent"],
      allowMethods: ["POST", "GET", "OPTIONS", "PUT", "DELETE", "PATCH"],
      exposeHeaders: ["Content-Length", "Content-Type", "Content-Disposition"],
      maxAge: 600,
    }),
  )
  .route("/auth", authRoute)
  .route("/transactions", transactionsRoute)
  .route("/users", usersRoute);

serve(app, (info) => {
  console.log(`[Server] Listening on ${info.address}:${info.port}`);
});

export type AppType = typeof app;
export type * from "./schemas";
