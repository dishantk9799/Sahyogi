import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { seedPosts } from "@/services/seed-data";
export default function DashboardPostsPage() {
  return (
    <DashboardShell>
      <h1 className="text-3xl font-semibold">Post management</h1>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>All posts</CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {seedPosts.map((post) => (
            <div
              key={post.id}
              className="grid gap-3 py-4 md:grid-cols-[1fr_140px_120px] md:items-center"
            >
              <div>
                <p className="font-medium">{post.title}</p>
                <p className="text-sm text-muted-foreground">{post.subtitle}</p>
              </div>
              <Badge variant="outline" className="w-fit">
                {post.category}
              </Badge>
              <span className="text-sm text-muted-foreground">{post.readTimeMinutes} min read</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
