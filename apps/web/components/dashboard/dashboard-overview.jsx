"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/dashboard/metric-card";
import { getApiErrorMessage } from "@/services/api";
import { getDashboardOverview } from "@/services/dashboard";
import { getMyPosts } from "@/services/posts";

function buildMetrics(overview) {
  return [
    {
      label: "Publications",
      value: overview.publications,
      delta: "Owned by your account",
    },
    {
      label: "Posts",
      value: overview.posts,
      delta: `${overview.publishedPosts} published`,
    },
    {
      label: "Drafts",
      value: overview.drafts,
      delta: "Ready to edit",
    },
    {
      label: "Subscribers",
      value: overview.subscribers,
      delta: "Active subscribers",
    },
  ];
}

export function DashboardOverview() {
  const [overview, setOverview] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadDashboard() {
      try {
        const [nextOverview, nextPosts] = await Promise.all([
          getDashboardOverview(),
          getMyPosts(),
        ]);

        if (mounted) {
          setOverview(nextOverview);
          setPosts(nextPosts.slice(0, 5));
          setError("");
        }
      } catch (requestError) {
        if (mounted) {
          setError(getApiErrorMessage(requestError, "Dashboard data could not be loaded"));
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadDashboard();

    return () => {
      mounted = false;
    };
  }, []);

  const metrics = useMemo(() => (overview ? buildMetrics(overview) : []), [overview]);

  if (loading) {
    return (
      <div className="rounded-lg border bg-card p-6">
        <p className="text-sm text-muted-foreground">Loading dashboard data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border bg-card p-6">
        <h2 className="font-semibold">Dashboard could not be loaded</h2>
        <p className="mt-2 text-sm text-muted-foreground">{error}</p>
      </div>
    );
  }

  return (
    <>
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
        {metrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Recent work</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {posts.length ? (
            posts.map((post) => (
              <div
                key={post.id}
                className="flex flex-col gap-3 border-b pb-4 last:border-b-0 sm:flex-row sm:items-center"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{post.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {post.readTimeMinutes} min read
                  </p>
                </div>
                <Badge variant="outline">{post.status}</Badge>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              No posts yet. Start a draft to see your work here.
            </p>
          )}
        </CardContent>
      </Card>
    </>
  );
}
