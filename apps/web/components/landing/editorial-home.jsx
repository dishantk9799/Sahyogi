"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MailPlus, PenLine, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PostCard } from "@/components/content/post-card";
import { PublicationCard } from "@/components/content/publication-card";
export function EditorialHome({ posts, publications }) {
  const [featured, ...rest] = posts;
  const features = [
    {
      title: "Editorial OS",
      body: "Draft, refine, schedule, and publish without losing the thread.",
      icon: PenLine,
    },
    {
      title: "Subscription-ready",
      body: "Capture intent and build reader relationships from day one.",
      icon: MailPlus,
    },
    {
      title: "Signal dashboard",
      body: "Track the metrics that help writers make better decisions.",
      icon: TrendingUp,
    },
  ];
  return (
    <main>
      <section className="border-b">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-16">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center"
          >
            <Badge variant="outline" className="w-fit">
              Independent publishing, rebuilt
            </Badge>
            <h1 className="mt-6 max-w-3xl font-serif text-5xl leading-[1.03] tracking-normal sm:text-6xl lg:text-7xl">
              A calmer home for serious writers and their readers.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              Sahyogi combines publications, editorial tools, subscriptions, and a focused reader
              experience in one modern workspace.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/dashboard/editor">
                  Start writing
                  <PenLine className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/explore">
                  Explore publications
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-lg border bg-card p-3"
          >
            {featured ? <PostCard post={featured} featured /> : null}
          </motion.div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-3 lg:px-8">
        {features.map(({ title, body, icon: Icon }) => (
          <div key={title} className="border-l pl-5">
            <Icon className="h-5 w-5 text-muted-foreground" />
            <h2 className="mt-4 text-lg font-semibold">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
          </div>
        ))}
      </section>

      <section className="border-y bg-secondary/35">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Latest essays</p>
              <h2 className="mt-2 text-3xl font-semibold">Built for long-form attention</h2>
            </div>
            <Button asChild variant="outline" className="hidden sm:inline-flex">
              <Link href="/explore">View all</Link>
            </Button>
          </div>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {rest.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-medium text-muted-foreground">Publications</p>
          <h2 className="mt-2 text-3xl font-semibold">
            Discover editorial rooms with a point of view
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {publications.map((publication) => (
            <PublicationCard key={publication.id} publication={publication} />
          ))}
        </div>
      </section>
    </main>
  );
}
