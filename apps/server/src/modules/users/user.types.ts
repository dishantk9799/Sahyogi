import type { Types } from "mongoose";

export type UserRole = "reader" | "writer" | "admin";

export type SafeUser = {
  id: string;
  fullName: string;
  username: string;
  email: string;
  role: UserRole;
  bio: string;
  avatarUrl: string;
  bannerUrl: string;
  socials: {
    website?: string;
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
  emailVerifiedAt: Date | undefined;
  createdAt: Date;
  updatedAt: Date;
};

export type UserDocumentShape = {
  _id: Types.ObjectId;
  fullName: string;
  username: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  bio: string;
  avatarUrl: string;
  bannerUrl: string;
  socials: SafeUser["socials"];
  emailVerifiedAt: Date | undefined;
  createdAt: Date;
  updatedAt: Date;
};
