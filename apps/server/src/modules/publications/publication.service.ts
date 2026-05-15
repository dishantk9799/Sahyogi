import { HttpStatus } from "../../constants/http";
import { ApiError } from "../../utils/api-error";
import { createSlug } from "../../utils/slug";
import type { SafeUser } from "../users/user.types";
import { publicationsRepository } from "./publication.repository";
import { toPublicationDTO } from "./publication.serializer";
import { subscriptionsRepository } from "./subscription.repository";
import type {
  createPublicationSchema,
  subscribeSchema,
  updatePublicationSchema,
} from "./publication.validation";
import type { z } from "zod";

export const publicationsService = {
  async create(user: SafeUser, data: z.infer<typeof createPublicationSchema>) {
    const slug = data.slug?.toLowerCase() || createSlug(data.name);
    const existing = await publicationsRepository.findBySlug(slug);

    if (existing) {
      throw new ApiError(HttpStatus.CONFLICT, "Publication slug is already taken");
    }

    const publication = await publicationsRepository.create({
      ownerId: user.id,
      name: data.name,
      slug,
      description: data.description,
      tagline: data.tagline,
    });

    return toPublicationDTO(publication);
  },

  async getBySlug(slug: string) {
    const publication = await publicationsRepository.findBySlug(slug);

    if (!publication) {
      throw new ApiError(HttpStatus.NOT_FOUND, "Publication not found");
    }

    return toPublicationDTO(publication);
  },

  async listMine(user: SafeUser) {
    const publications = await publicationsRepository.findByOwner(user.id);
    return publications.map(toPublicationDTO);
  },

  async update(user: SafeUser, publicationId: string, data: z.infer<typeof updatePublicationSchema>) {
    const publication = await publicationsRepository.findById(publicationId);

    if (!publication) {
      throw new ApiError(HttpStatus.NOT_FOUND, "Publication not found");
    }

    if (publication.ownerId.toString() !== user.id) {
      throw new ApiError(HttpStatus.FORBIDDEN, "Only the owner can update this publication");
    }

    const nextSlug = data.slug?.toLowerCase();
    if (nextSlug && nextSlug !== publication.slug) {
      const existing = await publicationsRepository.findBySlug(nextSlug);
      if (existing) {
        throw new ApiError(HttpStatus.CONFLICT, "Publication slug is already taken");
      }
    }

    const update: Record<string, unknown> = { ...data };
    if (nextSlug) {
      update.slug = nextSlug;
    }

    const updated = await publicationsRepository.updateById(publicationId, update);

    return toPublicationDTO(updated!);
  },

  async subscribe(slug: string, data: z.infer<typeof subscribeSchema>, user?: SafeUser) {
    const publication = await publicationsRepository.findBySlug(slug);

    if (!publication) {
      throw new ApiError(HttpStatus.NOT_FOUND, "Publication not found");
    }

    const existing = await subscriptionsRepository.findActive(publication._id.toString(), data.email);

    if (existing) {
      return { status: "already_subscribed" as const, publication: toPublicationDTO(publication) };
    }

    await subscriptionsRepository.create({
      publicationId: publication._id.toString(),
      email: data.email,
      source: data.source,
      ...(user ? { userId: user.id } : {}),
    });

    const updated = await publicationsRepository.incrementSubscribers(publication._id.toString(), 1);

    return { status: "subscribed" as const, publication: toPublicationDTO(updated ?? publication) };
  },
};
