import Link from "next/link";
import { BarChart3, FileText, Settings, Users } from "lucide-react";
import { SiteHeader } from "@/components/site/site-header";
import { Button } from "@/components/ui/button";
const dashboardNav = [
  { href: "/dashboard", label: "Overview", icon: BarChart3 },
  { href: "/dashboard/posts", label: "Posts", icon: FileText },
  { href: "/dashboard/subscribers", label: "Subscribers", icon: Users },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];
export function DashboardShell({ children }) {
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
        <section>{children}</section>
      </main>
    </>
  );
}
