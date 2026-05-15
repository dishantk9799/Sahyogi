"use client";
import Link from "next/link";
import { useState } from "react";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { commandItems } from "@/constants/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/use-store";
import { setCommandOpen } from "@/store/ui-slice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
export function CommandMenu() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.ui.commandOpen);
  const [query, setQuery] = useState("");

  function closeMenu() {
    dispatch(setCommandOpen(false));
  }

  function onSearch(event) {
    event.preventDefault();
    const nextQuery = query.trim();

    if (!nextQuery) {
      return;
    }

    router.push(`/explore?q=${encodeURIComponent(nextQuery)}`);
    closeMenu();
  }

  if (!open) {
    return null;
  }
  return (
    <div className="fixed inset-0 z-50 bg-background/70 px-4 pt-20 backdrop-blur">
      <div className="mx-auto max-w-xl rounded-lg border bg-card shadow-2xl">
        <div className="flex items-center gap-3 border-b px-4 py-3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <form onSubmit={onSearch} className="flex min-w-0 flex-1 items-center gap-2">
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              autoFocus
              placeholder="Search posts"
              className="h-9 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
            />
          </form>
          <Button
            className="ml-auto"
            size="icon"
            variant="ghost"
            onClick={closeMenu}
            aria-label="Close command menu"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="p-2">
          {commandItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className="flex items-center gap-3 rounded-md px-3 py-3 text-sm transition-colors hover:bg-accent"
            >
              <item.icon className="h-4 w-4 text-muted-foreground" />
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
