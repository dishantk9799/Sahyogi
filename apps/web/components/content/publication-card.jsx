import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
export function PublicationCard({ publication }) {
  return (
    <Card className="transition-colors hover:border-primary/40">
      <CardContent className="p-5">
        <div
          className="mb-5 h-2 w-20 rounded-full"
          style={{ backgroundColor: publication.accentColor }}
          aria-hidden
        />
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold">{publication.name}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{publication.tagline}</p>
          </div>
          <Link
            href={`/publications/${publication.slug}`}
            className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            aria-label={`Open ${publication.name}`}
          >
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <p className="mt-5 text-xs font-medium text-muted-foreground">
          {publication.subscriberCount.toLocaleString()} subscribers
        </p>
      </CardContent>
    </Card>
  );
}
