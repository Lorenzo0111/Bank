import { useSession } from "@/components/contexts/SessionContext";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createLazyFileRoute("/auth/logout")({
  component: Logout,
});

function Logout() {
  const { logout } = useSession();
  const navigate = Route.useNavigate();

  useEffect(() => {
    logout();
    navigate({
      to: "/auth/login",
    });
  }, [navigate, logout]);

  return null;
}
