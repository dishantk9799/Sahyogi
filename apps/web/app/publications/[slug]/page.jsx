import { SiteHeader } from "@/components/site/site-header";
import { SubscribeForm } from "@/components/content/subscribe-form";
import { PostCard } from "@/components/content/post-card";
import { getFeaturedPosts, getPublication } from "@/services/content";
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const publication = await getPublication(slug);
  return {
    title: publication.name,
    description: publication.tagline,
  };
}
export default async function PublicationPage({ params }) {
  const { slug } = await params;
  const [publication, posts] = await Promise.all([getPublication(slug), getFeaturedPosts()]);
  return (
    <>
      <SiteHeader />
      <main>
        <section className="border-b">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
            <div
              className="mb-8 h-3 w-28 rounded-full"
              style={{ backgroundColor: publication.accentColor }}
              aria-hidden
            />
            <h1 className="font-serif text-6xl leading-tight">{publication.name}</h1>
            <p className="mt-5 max-w-2xl text-xl leading-8 text-muted-foreground">
              {publication.tagline}
            </p>
            <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
              {publication.description}
            </p>
            <div className="mt-8 max-w-xl">
              <SubscribeForm publicationSlug={publication.slug} />
            </div>
          </div>
        </section>
        <section className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 lg:px-8">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </section>
      </main>
    </>
  );
}
