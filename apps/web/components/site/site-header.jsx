"use client";
import Link from "next/link";
import { Menu, Search, SquarePen } from "lucide-react";
import { primaryNavigation } from "@/constants/navigation";
import { useAppDispatch } from "@/hooks/use-store";
import { setCommandOpen } from "@/store/ui-slice";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { CommandMenu } from "./command-menu";
export function SiteHeader() {
  const dispatch = useAppDispatch();
  return (
    <>
      <header className="sticky top-0 z-40 border-b bg-background/86 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 font-semibold tracking-normal">
            <span className="grid h-8 w-8 place-items-center rounded-md bg-primary text-sm text-primary-foreground">
              S
            </span>
            <span>Sahyogi</span>
          </Link>
          <nav className="ml-6 hidden items-center gap-1 md:flex">
            {primaryNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Button
              variant="outline"
              className="hidden min-w-52 justify-start text-muted-foreground md:inline-flex"
              onClick={() => dispatch(setCommandOpen(true))}
            >
              <Search className="h-4 w-4" />
              Search or jump
            </Button>
            <ThemeToggle />
            <Button asChild className="hidden md:inline-flex">
              <Link href="/dashboard/editor">
                <SquarePen className="h-4 w-4" />
                Write
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => dispatch(setCommandOpen(true))}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
      <CommandMenu />
    </>
  );
}
