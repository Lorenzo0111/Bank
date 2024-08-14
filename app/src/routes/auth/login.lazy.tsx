import { useSession } from "@/components/contexts/SessionContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { honoClient } from "@/lib/fetcher";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/auth/login")({
  component: Login,
});

function Login() {
  const navigate = Route.useNavigate();
  const { toast } = useToast();
  const { login, session } = useSession();

  if (session) {
    navigate({
      to: "/",
    });
    return null;
  }

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Card className="min-w-[30rem]">
        <CardHeader>
          <CardTitle>Welcome!</CardTitle>
          <CardDescription>Please login to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={async (e) => {
              e.preventDefault();

              const form = new FormData(e.target as HTMLFormElement);
              const email = form.get("email") as string;
              const password = form.get("password") as string;

              const res = await honoClient.auth.login.$post({
                json: {
                  email,
                  password,
                },
              });

              const data = await res.json();
              if ("token" in data) {
                login(data.token);
                navigate({
                  to: "/",
                });
                return;
              }

              toast({
                description: "Invalid email or password",
                variant: "destructive",
              });
            }}
            className="flex flex-col gap-3"
          >
            <Input
              className="w-full"
              placeholder="Email"
              name="email"
              type="email"
            />
            <Input
              className="w-full"
              placeholder="Password"
              name="password"
              type="password"
            />

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
