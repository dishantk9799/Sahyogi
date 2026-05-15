import Link from "next/link";
import { dashboardMetrics, seedPosts } from "@/services/seed-data";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { MetricCard } from "@/components/dashboard/metric-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
export default function DashboardPage() {
  return (
    <DashboardShell>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Writer dashboard</p>
          <h1 className="mt-2 text-3xl font-semibold">Publication health</h1>
        </div>
        <Button asChild>
          <Link href="/dashboard/editor">New post</Link>
        </Button>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardMetrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </div>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Recent work</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {seedPosts.map((post) => (
            <div
              key={post.id}
              className="flex flex-col gap-3 border-b pb-4 last:border-b-0 sm:flex-row sm:items-center"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{post.title}</p>
                <p className="text-sm text-muted-foreground">{post.readTimeMinutes} min read</p>
              </div>
              <Badge variant="outline">Published</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
