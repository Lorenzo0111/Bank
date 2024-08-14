import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/auth/login")({
  component: Login,
});

function Login() {
  return <div className="p-2" />;
}
