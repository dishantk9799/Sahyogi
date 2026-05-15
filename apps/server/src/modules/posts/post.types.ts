export type PostStatus = "draft" | "published" | "scheduled" | "archived";

export type PostContent = {
  html: string;
  text: string;
  json?: unknown;
};

export type PostDTO = {
  id: string;
  publicationId: string;
  authorId: string;
  title: string;
  slug: string;
  subtitle: string;
  coverImageUrl: string;
  content: PostContent;
  status: PostStatus;
  tags: string[];
  category: string;
  readTimeMinutes: number;
  seo: {
    title: string;
    description: string;
  };
  publishedAt: Date | undefined;
  scheduledFor: Date | undefined;
  createdAt: Date;
  updatedAt: Date;
};
