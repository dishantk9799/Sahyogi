"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getApiErrorMessage } from "@/services/api";
import { getMyPosts } from "@/services/posts";

export function PostManagement() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadPosts() {
      try {
        const nextPosts = await getMyPosts();

        if (mounted) {
          setPosts(nextPosts);
          setError("");
        }
      } catch (requestError) {
        if (mounted) {
          setError(getApiErrorMessage(requestError, "Posts could not be loaded"));
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadPosts();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <h1 className="text-3xl font-semibold">Post management</h1>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>All posts</CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {loading ? (
            <p className="py-4 text-sm text-muted-foreground">Loading posts...</p>
          ) : null}

          {!loading && error ? (
            <p className="py-4 text-sm text-destructive">{error}</p>
          ) : null}

          {!loading && !error && !posts.length ? (
            <p className="py-4 text-sm text-muted-foreground">
              No posts yet. Create a draft from the editor to start your publication.
            </p>
          ) : null}

          {!loading && !error
            ? posts.map((post) => (
                <div
                  key={post.id}
                  className="grid gap-3 py-4 md:grid-cols-[1fr_140px_120px] md:items-center"
                >
                  <div>
                    <p className="font-medium">{post.title}</p>
                    <p className="text-sm text-muted-foreground">{post.subtitle}</p>
                  </div>
                  <Badge variant="outline" className="w-fit">
                    {post.status}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {post.readTimeMinutes} min read
                  </span>
                </div>
              ))
            : null}
        </CardContent>
      </Card>
    </>
  );
}
