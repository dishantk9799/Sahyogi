"use client";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
const RichEditor = dynamic(
  () => import("@/components/editor/rich-editor").then((module) => module.RichEditor),
  {
    ssr: false,
    loading: () => <div className="h-[580px] rounded-lg border bg-card" />,
  },
);
export function EditorWorkspace() {
  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Editor</p>
          <h1 className="mt-2 text-3xl font-semibold">Draft a new issue</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Save draft</Button>
          <Button>Publish</Button>
        </div>
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
        <RichEditor />
        <aside className="space-y-4">
          <div className="rounded-lg border bg-card p-5">
            <h2 className="font-semibold">Post settings</h2>
            <div className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">SEO title</Label>
                <Input id="title" placeholder="A precise searchable title" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">SEO description</Label>
                <Textarea
                  id="description"
                  placeholder="What readers and search previews should know"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input id="tags" placeholder="publishing, product, writing" />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
