"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BarChart3, FileText, Settings, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { SiteHeader } from "@/components/site/site-header";
import { Button } from "@/components/ui/button";
import { api } from "@/services/api";
const dashboardNav = [
  { href: "/dashboard", label: "Overview", icon: BarChart3 },
  { href: "/dashboard/posts", label: "Posts", icon: FileText },
  { href: "/dashboard/subscribers", label: "Subscribers", icon: Users },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];
export function DashboardShell({ children }) {
  const router = useRouter();
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function verifySession() {
      try {
        await api.get("/api/auth/me");
        if (mounted) {
          setCheckingSession(false);
        }
      } catch {
        router.replace("/login");
      }
    }

    verifySession();

    return () => {
      mounted = false;
    };
  }, [router]);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[240px_1fr] lg:px-8">
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <nav className="grid gap-1">
            {dashboardNav.map((item) => (
              <Button key={item.href} asChild variant="ghost" className="justify-start">
                <Link href={item.href}>
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </Button>
            ))}
          </nav>
        </aside>
        <section>
          {checkingSession ? (
            <div className="rounded-lg border bg-card p-6">
              <p className="text-sm text-muted-foreground">Checking your session...</p>
            </div>
          ) : (
            children
          )}
        </section>
      </main>
    </>
  );
}
