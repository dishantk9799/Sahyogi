import { HttpStatus } from "../../constants/http.js";
import { ApiError } from "../../utils/api-error.js";
import { createSlug } from "../../utils/slug.js";
import { publicationsRepository } from "./publication.repository.js";
import { toPublicationDTO } from "./publication.serializer.js";
import { subscriptionsRepository } from "./subscription.repository.js";
export const publicationsService = {
  async create(user, data) {
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
  async getBySlug(slug) {
    const publication = await publicationsRepository.findBySlug(slug);
    if (!publication) {
      throw new ApiError(HttpStatus.NOT_FOUND, "Publication not found");
    }
    return toPublicationDTO(publication);
  },
  async listPublic() {
    const publications = await publicationsRepository.findPublic();
    return publications.map(toPublicationDTO);
  },
  async listMine(user) {
    const publications = await publicationsRepository.findByOwner(user.id);
    return publications.map(toPublicationDTO);
  },
  async update(user, publicationId, data) {
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
    const update = { ...data };
    if (nextSlug) {
      update.slug = nextSlug;
    }
    const updated = await publicationsRepository.updateById(publicationId, update);
    return toPublicationDTO(updated);
  },
  async subscribe(slug, data, user) {
    const publication = await publicationsRepository.findBySlug(slug);
    if (!publication) {
      throw new ApiError(HttpStatus.NOT_FOUND, "Publication not found");
    }
    const existing = await subscriptionsRepository.findActive(
      publication._id.toString(),
      data.email,
    );
    if (existing) {
      return { status: "already_subscribed", publication: toPublicationDTO(publication) };
    }
    await subscriptionsRepository.create({
      publicationId: publication._id.toString(),
      email: data.email,
      source: data.source,
      ...(user ? { userId: user.id } : {}),
    });
    const updated = await publicationsRepository.incrementSubscribers(
      publication._id.toString(),
      1,
    );
    return { status: "subscribed", publication: toPublicationDTO(updated ?? publication) };
  },
};
