"use client";

import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getApiErrorMessage } from "@/services/api";
import { getMyPublications, getPublicationSubscribers } from "@/services/publications";

export function SubscriberManagement() {
  const [publications, setPublications] = useState([]);
  const [selectedPublicationId, setSelectedPublicationId] = useState("");
  const [search, setSearch] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [subscribers, setSubscribers] = useState([]);
  const [loadingPublications, setLoadingPublications] = useState(true);
  const [loadingSubscribers, setLoadingSubscribers] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadPublications() {
      try {
        const nextPublications = await getMyPublications();

        if (mounted) {
          setPublications(nextPublications);
          setSelectedPublicationId(nextPublications[0]?.id ?? "");
        }
      } catch (requestError) {
        if (mounted) {
          setError(getApiErrorMessage(requestError, "Publications could not be loaded"));
        }
      } finally {
        if (mounted) {
          setLoadingPublications(false);
        }
      }
    }

    loadPublications();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!selectedPublicationId) {
      setSubscribers([]);
      return;
    }

    let mounted = true;

    async function loadSubscribers() {
      setLoadingSubscribers(true);

      try {
        const result = await getPublicationSubscribers(selectedPublicationId, {
          search: submittedSearch || undefined,
        });

        if (mounted) {
          setSubscribers(result.subscribers);
          setError("");
        }
      } catch (requestError) {
        if (mounted) {
          setError(getApiErrorMessage(requestError, "Subscribers could not be loaded"));
        }
      } finally {
        if (mounted) {
          setLoadingSubscribers(false);
        }
      }
    }

    loadSubscribers();

    return () => {
      mounted = false;
    };
  }, [selectedPublicationId, submittedSearch]);

  const selectedPublication = useMemo(
    () => publications.find((publication) => publication.id === selectedPublicationId),
    [publications, selectedPublicationId],
  );

  function onSearch(event) {
    event.preventDefault();
    setSubmittedSearch(search.trim());
  }

  return (
    <>
      <h1 className="text-3xl font-semibold">Subscribers</h1>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Subscriber management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {loadingPublications ? (
            <p className="text-sm text-muted-foreground">Loading publications...</p>
          ) : null}

          {!loadingPublications && !publications.length ? (
            <p className="text-sm text-muted-foreground">
              Create a publication before collecting subscribers.
            </p>
          ) : null}

          {!loadingPublications && publications.length ? (
            <>
              <div className="grid gap-3 md:grid-cols-[260px_1fr]">
                <select
                  value={selectedPublicationId}
                  onChange={(event) => setSelectedPublicationId(event.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {publications.map((publication) => (
                    <option key={publication.id} value={publication.id}>
                      {publication.name}
                    </option>
                  ))}
                </select>
                <form onSubmit={onSearch} className="flex gap-2">
                  <Input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search subscribers"
                  />
                  <Button type="submit" variant="outline">
                    <Search className="size-4" />
                    Search
                  </Button>
                </form>
              </div>

              {selectedPublication ? (
                <p className="text-sm text-muted-foreground">
                  {selectedPublication.subscriberCount} active subscribers
                </p>
              ) : null}
            </>
          ) : null}

          {error ? <p className="text-sm text-destructive">{error}</p> : null}

          {loadingSubscribers ? (
            <p className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
              Loading subscribers...
            </p>
          ) : null}

          {!loadingSubscribers && selectedPublicationId && !error && !subscribers.length ? (
            <p className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
              No active subscribers found.
            </p>
          ) : null}

          {!loadingSubscribers && subscribers.length ? (
            <div className="divide-y rounded-lg border">
              {subscribers.map((subscriber) => (
                <div
                  key={subscriber.id}
                  className="grid gap-2 p-4 md:grid-cols-[minmax(0,1fr)_120px_160px] md:items-center"
                >
                  <p className="truncate font-medium">{subscriber.email}</p>
                  <span className="text-sm text-muted-foreground">{subscriber.source}</span>
                  <span className="text-sm text-muted-foreground">
                    {format(new Date(subscriber.createdAt), "MMM d, yyyy")}
                  </span>
                </div>
              ))}
            </div>
          ) : null}
        </CardContent>
      </Card>
    </>
  );
}
