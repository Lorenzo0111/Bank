import { cn } from "@/lib/utils";
import { type FileRoutesByPath, useRouterState } from "@tanstack/react-router";
import { Home, LogOut } from "lucide-react";
import { useSession } from "../contexts/SessionContext";
import { ButtonLink } from "./button";
import { ThemeSwitch } from "./theme-switch";

export function SidebarLink({
  href,
  icon,
  className,
}: {
  href: keyof FileRoutesByPath;
  icon: React.ReactNode;
  className?: string;
}) {
  const router = useRouterState();

  return (
    <ButtonLink
      variant={
        (
          href === "/"
            ? router.location.pathname === "/"
            : router.location.pathname.startsWith(href)
        )
          ? "secondary"
          : "outline"
      }
      className={cn("p-2", className)}
      href={href}
    >
      {icon}
    </ButtonLink>
  );
}

export function Sidebar() {
  const { session } = useSession();
  if (!session) return null;

  return (
    <nav className="flex h-screen w-20 flex-col items-center gap-3 border-r py-4">
      <SidebarLink href="/" icon={<Home size={24} />} />

      <ThemeSwitch className="mt-auto" />
      <SidebarLink href="/auth/logout" icon={<LogOut size={24} />} />
    </nav>
  );
}
