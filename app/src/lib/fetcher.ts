import type { AppType } from "api";
import { hc } from "hono/client";

export const authenticatedHonoClient = (token: string | null) => {
  // biome-ignore lint/suspicious/noExplicitAny: any is required here
  const headers: any = {};
  if (token) headers.Authorization = `Bearer ${token}`;

  return hc<AppType>(import.meta.env.VITE_API_URL as string, {
    headers: {
      ...headers,
      "User-Agent": "Bank/1.0.0",
    },
  });
};

export const honoClient = authenticatedHonoClient(
  localStorage.getItem("token"),
);
