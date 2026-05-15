export type PublicationStatus = "draft" | "active" | "paused";

export type PublicationDTO = {
  id: string;
  ownerId: string;
  name: string;
  slug: string;
  description: string;
  tagline: string;
  logoUrl: string;
  coverUrl: string;
  accentColor: string;
  status: PublicationStatus;
  subscriberCount: number;
  createdAt: Date;
  updatedAt: Date;
};
