import { SiteHeader } from "@/components/site/site-header";
import { PostCard } from "@/components/content/post-card";
import { PublicationCard } from "@/components/content/publication-card";
import { getFeaturedPosts, getPublications } from "@/services/content";
export const metadata = {
  title: "Explore",
  description: "Discover Sahyogi publications and essays.",
};
export default async function ExplorePage() {
  const [posts, publications] = await Promise.all([getFeaturedPosts(), getPublications()]);
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-muted-foreground">Explore</p>
          <h1 className="mt-3 font-serif text-5xl leading-tight">
            Fresh thinking from independent rooms.
          </h1>
        </div>
        <section className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="grid gap-8 md:grid-cols-2">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          <aside className="space-y-4">
            {publications.map((publication) => (
              <PublicationCard key={publication.id} publication={publication} />
            ))}
          </aside>
        </section>
      </main>
    </>
  );
}
