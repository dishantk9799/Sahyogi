import { HttpStatus } from "../../constants/http.js";
import { ApiError } from "../../utils/api-error.js";
import { createSlug } from "../../utils/slug.js";
import { publicationsRepository } from "./publication.repository.js";
import { toPublicationDTO } from "./publication.serializer.js";
import { toSubscriptionDTO } from "./subscription.serializer.js";
import { subscriptionsRepository } from "./subscription.repository.js";

async function assertPublicationOwner(publicationId, user) {
  const publication = await publicationsRepository.findById(publicationId);
  if (!publication) {
    throw new ApiError(HttpStatus.NOT_FOUND, "Publication not found");
  }
  if (publication.ownerId.toString() !== user.id) {
    throw new ApiError(HttpStatus.FORBIDDEN, "Only the owner can manage this publication");
  }
  return publication;
}

async function syncSubscriberCount(publication) {
  const publicationId = publication._id.toString();
  const subscriberCount = await subscriptionsRepository.countByPublication(publicationId);
  return publicationsRepository.updateById(publicationId, { subscriberCount });
}

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
    const publication = await assertPublicationOwner(publicationId, user);
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
  async listSubscribers(user, publicationId, query) {
    const publication = await assertPublicationOwner(publicationId, user);
    const subscribers = await subscriptionsRepository.findActiveByPublication(publicationId, {
      search: query.search,
      limit: query.limit,
    });

    return {
      publication: toPublicationDTO(publication),
      subscribers: subscribers.map(toSubscriptionDTO),
    };
  },
  async subscribe(slug, data, user) {
    const publication = await publicationsRepository.findBySlug(slug);
    if (!publication) {
      throw new ApiError(HttpStatus.NOT_FOUND, "Publication not found");
    }

    const publicationId = publication._id.toString();
    const existing = await subscriptionsRepository.findByPublicationAndEmail(
      publicationId,
      data.email,
    );

    if (existing?.status === "active") {
      return { status: "already_subscribed", publication: toPublicationDTO(publication) };
    }

    if (existing) {
      await subscriptionsRepository.updateStatus(existing._id, "active");
    } else {
      await subscriptionsRepository.create({
        publicationId,
        email: data.email,
        source: data.source,
        ...(user ? { userId: user.id } : {}),
      });
    }

    const updated = await syncSubscriberCount(publication);
    return { status: "subscribed", publication: toPublicationDTO(updated ?? publication) };
  },
  async unsubscribe(slug, data) {
    const publication = await publicationsRepository.findBySlug(slug);
    if (!publication) {
      throw new ApiError(HttpStatus.NOT_FOUND, "Publication not found");
    }

    const existing = await subscriptionsRepository.findActive(
      publication._id.toString(),
      data.email,
    );

    if (!existing) {
      return { status: "not_subscribed", publication: toPublicationDTO(publication) };
    }

    await subscriptionsRepository.updateStatus(existing._id, "unsubscribed");
    const updated = await syncSubscriberCount(publication);
    return { status: "unsubscribed", publication: toPublicationDTO(updated ?? publication) };
  },
};
