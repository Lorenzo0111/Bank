import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { authRoute } from "./routes/auth";
import { balanceRoute } from "./routes/balance";
import { cardsRoute } from "./routes/cards";
import { paymentsRoute } from "./routes/payments";
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
  .route("/balance", balanceRoute)
  .route("/users", usersRoute)
  .route("/cards", cardsRoute)
  .route("/payments", paymentsRoute);

serve(app, (info) => {
  console.log(`[Server] Listening on ${info.address}:${info.port}`);
});

export type AppType = typeof app;
export type * from "./schemas";
