import { cn } from "@/lib/utils";
import { type FileRoutesByPath, useRouterState } from "@tanstack/react-router";
import { CreditCard, Home, Landmark, LogOut, Menu, Users } from "lucide-react";
import { useMediaQuery } from "../hooks/use-media-query";
import { Button, ButtonLink } from "./button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer";
import { ThemeSwitch } from "./theme-switch";
import VisuallyHidden from "./visually-hidden";

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

export type SidebarProps = {
  loggedIn: boolean;
};

export function Sidebar(props: SidebarProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  if (isDesktop) return <SidebarContent {...props} />;

  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="absolute right-4 bottom-4 z-20 flex h-14 w-14 items-center justify-center"
        >
          <Menu size={40} />
        </Button>
      </DrawerTrigger>

      <DrawerContent className="w-fit">
        <VisuallyHidden>
          <DrawerHeader>
            <DrawerTitle>Sidebar</DrawerTitle>
            <DrawerDescription>
              Click on a link to start navigating
            </DrawerDescription>
          </DrawerHeader>
        </VisuallyHidden>

        <SidebarContent {...props} />
      </DrawerContent>
    </Drawer>
  );
}

export function SidebarContent({ loggedIn }: SidebarProps) {
  return (
    <nav className="flex h-screen flex-col items-center gap-3 border-r py-4 lg:w-20">
      <SidebarLink href="/" icon={<Home size={24} />} />
      <SidebarLink href="/friends" icon={<Users size={24} />} />
      <SidebarLink href="/cards" icon={<CreditCard size={24} />} />
      <SidebarLink href="/savings" icon={<Landmark size={24} />} />

      <ThemeSwitch className="mt-auto" />
      {loggedIn && (
        <SidebarLink href="/auth/logout" icon={<LogOut size={24} />} />
      )}
    </nav>
  );
}
