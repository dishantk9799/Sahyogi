import { format } from "date-fns";
import { SiteHeader } from "@/components/site/site-header";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CoverFrame } from "@/components/content/cover-frame";
import { SubscribeForm } from "@/components/content/subscribe-form";
import { getPost } from "@/services/content";
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  return {
    title: post.title,
    description: post.subtitle,
  };
}
export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  return (
    <>
      <SiteHeader />
      <main>
        <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">{post.category}</Badge>
            <span className="text-sm text-muted-foreground">
              {format(new Date(post.publishedAt), "MMMM d, yyyy")} · {post.readTimeMinutes} min read
            </span>
          </div>
          <h1 className="mt-6 font-serif text-5xl leading-tight sm:text-6xl">{post.title}</h1>
          <p className="mt-5 text-xl leading-8 text-muted-foreground">{post.subtitle}</p>
          <div className="mt-8 flex items-center gap-3">
            <Avatar name={post.author.fullName} src={post.author.avatarUrl} />
            <div>
              <p className="font-medium">{post.author.fullName}</p>
              <p className="text-sm text-muted-foreground">{post.publication.name}</p>
            </div>
          </div>
          <CoverFrame title={post.title} className="mt-10 aspect-[16/8]" />
          <div
            className="prose-sahyogi editorial-measure mx-auto mt-10"
            dangerouslySetInnerHTML={{ __html: post.content.html }}
          />
        </article>
        <section className="border-t bg-secondary/35">
          <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold">
              Read the next issue from {post.publication.name}
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {post.publication.tagline}
            </p>
            <div className="mt-6 max-w-xl">
              <SubscribeForm publicationSlug={post.publication.slug} />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
