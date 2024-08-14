import {
  SessionProvider,
  useSession,
} from "@/components/contexts/SessionContext";
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
  const { session } = useSession();
  const navigate = Route.useNavigate();
  const router = useRouterState();

  if (!session && !router.location.pathname.startsWith("/auth")) {
    navigate({
      to: "/auth/login",
    });
    return null;
  }

  return <Outlet />;
}
