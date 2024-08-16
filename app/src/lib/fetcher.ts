import type { AppType } from "api";
import { hc } from "hono/client";

export const authenticatedHonoClient = (token: string | null) => {
  const headers: {
    [key: string]: string;
  } = {};
  if (token) headers.Authorization = `Bearer ${token}`;

  return hc<AppType>(import.meta.env.VITE_API_URL as string, {
    headers: {
      ...headers,
      "User-Agent": "Bank/1.0.0",
    },
    fetch: async (input: URL | RequestInfo, init?: RequestInit) => {
      const res = await fetch(input, init);
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error);
      }

      return res;
    },
  });
};

export const honoClient = authenticatedHonoClient(
  localStorage.getItem("token"),
);
