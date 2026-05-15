export type Writer = {
  id: string;
  fullName: string;
  username: string;
  avatarUrl: string;
  bio: string;
};

export type Publication = {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  accentColor: string;
  subscriberCount: number;
};

export type Post = {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  coverImageUrl: string;
  category: string;
  tags: string[];
  readTimeMinutes: number;
  publishedAt: string;
  author: Writer;
  publication: Publication;
  content: {
    html: string;
    text: string;
  };
};

export type DashboardMetric = {
  label: string;
  value: string;
  delta: string;
};
