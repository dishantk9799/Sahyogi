"use client";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { commandItems } from "@/constants/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/use-store";
import { setCommandOpen } from "@/store/ui-slice";
import { Button } from "@/components/ui/button";
export function CommandMenu() {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.ui.commandOpen);
  if (!open) {
    return null;
  }
  return (
    <div className="fixed inset-0 z-50 bg-background/70 px-4 pt-20 backdrop-blur">
      <div className="mx-auto max-w-xl rounded-lg border bg-card shadow-2xl">
        <div className="flex items-center gap-3 border-b px-4 py-3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Quick jump</span>
          <Button
            className="ml-auto"
            size="icon"
            variant="ghost"
            onClick={() => dispatch(setCommandOpen(false))}
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
              onClick={() => dispatch(setCommandOpen(false))}
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
