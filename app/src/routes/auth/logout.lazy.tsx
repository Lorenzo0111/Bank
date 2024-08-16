import { useSession } from "@/components/contexts/SessionContext";
import { useQueryClient } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createLazyFileRoute("/auth/logout")({
  component: Logout,
});

function Logout() {
  const { logout } = useSession();
  const navigate = Route.useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries();
    logout();
    navigate({
      to: "/auth/login",
    });
  }, [queryClient, navigate, logout]);

  return null;
}
