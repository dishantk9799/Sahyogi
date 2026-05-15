import type { PublicationDocument } from "./publication.model";
import type { PublicationDTO } from "./publication.types";

export function toPublicationDTO(publication: PublicationDocument): PublicationDTO {
  return {
    id: publication._id.toString(),
    ownerId: publication.ownerId.toString(),
    name: publication.name,
    slug: publication.slug,
    description: publication.description,
    tagline: publication.tagline,
    logoUrl: publication.logoUrl,
    coverUrl: publication.coverUrl,
    accentColor: publication.accentColor,
    status: publication.status,
    subscriberCount: publication.subscriberCount,
    createdAt: publication.createdAt,
    updatedAt: publication.updatedAt,
  };
}
