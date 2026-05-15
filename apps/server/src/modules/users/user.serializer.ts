import type { UserDocument } from "./user.model";
import type { SafeUser } from "./user.types";

export function toSafeUser(user: UserDocument): SafeUser {
  return {
    id: user._id.toString(),
    fullName: user.fullName,
    username: user.username,
    email: user.email,
    role: user.role,
    bio: user.bio,
    avatarUrl: user.avatarUrl,
    bannerUrl: user.bannerUrl,
    socials: user.socials ?? {},
    emailVerifiedAt: user.emailVerifiedAt,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}
