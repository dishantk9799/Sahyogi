import { SiteHeader } from "@/components/site/site-header";
import { EditorialHome } from "@/components/landing/editorial-home";
import { getFeaturedPosts, getPublications } from "@/services/content";
export default async function HomePage() {
  const [posts, publications] = await Promise.all([getFeaturedPosts(), getPublications()]);
  return (
    <>
      <SiteHeader />
      <EditorialHome posts={posts} publications={publications} />
    </>
  );
}
