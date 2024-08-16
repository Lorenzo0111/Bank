import { cn } from "@/lib/utils";
import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { Button } from "./button";

export function ThemeSwitch({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant={"outline"}
      className={cn("p-2", className)}
      onClick={toggleTheme}
    >
      {theme === "system" ? <Laptop /> : theme === "light" ? <Sun /> : <Moon />}
    </Button>
  );
}
