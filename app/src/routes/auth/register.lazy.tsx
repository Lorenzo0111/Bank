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
import { Link, createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/auth/register")({
  component: Register,
});

function Register() {
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
          <CardDescription>
            Please create an account to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={async (e) => {
              e.preventDefault();

              const form = new FormData(e.target as HTMLFormElement);
              const name = form.get("name") as string;
              const surname = form.get("surname") as string;
              const birthdate = form.get("birthdate") as string;
              const username = form.get("username") as string;
              const email = form.get("email") as string;
              const password = form.get("password") as string;
              const confirm_password = form.get("confirm_password") as string;

              try {
                const res = await honoClient.auth.register.$post({
                  json: {
                    name,
                    surname,
                    birthdate,
                    username,
                    email,
                    password,
                    confirm_password,
                  },
                });

                const data = await res.json();
                if ("error" in data) throw new Error(data.error);

                login(data.token);
                navigate({
                  to: "/",
                });
              } catch (_) {
                toast({
                  title: "Invalid data",
                  description:
                    "Your email or username is already in use, or your passwords do not match",
                  variant: "destructive",
                });
              }
            }}
            className="flex flex-col gap-3"
          >
            <div className="flex gap-3">
              <Input
                className="w-full"
                placeholder="Name"
                name="name"
                required
              />
              <Input
                className="w-full"
                placeholder="Surname"
                name="surname"
                required
              />
            </div>

            <Input
              className="w-full"
              placeholder="Birthdate"
              name="birthdate"
              type="date"
              required
            />

            <Input
              className="w-full"
              placeholder="Username"
              name="username"
              required
            />

            <Input
              className="w-full"
              placeholder="Email"
              name="email"
              type="email"
              required
            />

            <Input
              className="w-full"
              placeholder="Password"
              name="password"
              type="password"
              required
            />

            <Input
              className="w-full"
              placeholder="Confirm Password"
              name="confirm_password"
              type="password"
              required
            />

            <Button type="submit" className="w-full">
              Register
            </Button>
          </form>
          <p>
            Already member?{" "}
            <Link to="/auth/login" className="text-primary">
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
