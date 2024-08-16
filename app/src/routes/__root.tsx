import {
  SessionProvider,
  useSession,
} from "@/components/contexts/SessionContext";
import { Sidebar } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRoute,
  useRouterState,
} from "@tanstack/react-router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const Route = createRootRoute({
  component: () => <RootLayout />,
});

function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <LayoutProtector />
      </SessionProvider>
    </QueryClientProvider>
  );
}

function LayoutProtector() {
  const { session, isLoading } = useSession();
  const navigate = Route.useNavigate();
  const router = useRouterState();

  if (isLoading) return null;

  if (!session && !router.location.pathname.startsWith("/auth")) {
    navigate({
      to: "/auth/login",
    });
    return null;
  }

  return (
    <main
      className={"flex min-h-screen w-full bg-background font-sans antialiased"}
    >
      <Sidebar loggedIn={!!session} />
      <Outlet />
      <Toaster />
    </main>
  );
}
