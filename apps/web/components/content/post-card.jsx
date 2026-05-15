import { format } from "date-fns";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { CoverFrame } from "./cover-frame";
export function PostCard({ post, featured = false }) {
  return (
    <article className="group grid gap-4">
      <Link href={`/posts/${post.slug}`} className="block">
        <CoverFrame
          title={post.title}
          tone={featured ? "teal" : "violet"}
          className={featured ? "aspect-[16/9]" : "aspect-[4/3]"}
        />
      </Link>
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">{post.category}</Badge>
          <span className="text-xs text-muted-foreground">
            {format(new Date(post.publishedAt), "MMM d")} · {post.readTimeMinutes} min read
          </span>
        </div>
        <div>
          <Link
            href={`/posts/${post.slug}`}
            className="font-serif text-2xl leading-tight hover:underline"
          >
            {post.title}
          </Link>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{post.subtitle}</p>
        </div>
        <div className="flex items-center gap-3">
          <Avatar name={post.author.fullName} src={post.author.avatarUrl} className="h-8 w-8" />
          <div className="text-sm">
            <p className="font-medium">{post.author.fullName}</p>
            <p className="text-xs text-muted-foreground">{post.publication.name}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
