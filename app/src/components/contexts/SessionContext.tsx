import { authenticatedHonoClient, type honoClient } from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";
import type { InferResponseType } from "hono/client";
import {
  type PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type SessionContextType = {
  session: InferResponseType<typeof honoClient.auth.me.$get> | null;
  isLoading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
};

const SessionContext = createContext<SessionContextType | null>(null);

export function useSession() {
  const value = useContext(SessionContext);
  if (!value)
    throw new Error("useSession must be used within a SessionProvider");

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const { data: session, isLoading } = useQuery({
    queryKey: ["session", token],
    queryFn: async () => {
      if (!token) return null;

      return authenticatedHonoClient(token)
        .auth.me.$get()
        .then((res) => res.json());
    },
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (!token) localStorage.removeItem("token");
    else localStorage.setItem("token", token);
  }, [token]);

  return (
    <SessionContext.Provider
      value={{
        session: session || null,
        isLoading,
        login: async (token: string) => {
          setToken(token);
        },
        logout: () => setToken(null),
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}
