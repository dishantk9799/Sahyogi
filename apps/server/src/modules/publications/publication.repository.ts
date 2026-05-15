import { Publication } from "./publication.model";

export const publicationsRepository = {
  create(data: { ownerId: string; name: string; slug: string; description: string; tagline: string }) {
    return Publication.create(data);
  },

  findBySlug(slug: string) {
    return Publication.findOne({ slug: slug.toLowerCase() });
  },

  findById(id: string) {
    return Publication.findById(id);
  },

  findByOwner(ownerId: string) {
    return Publication.find({ ownerId }).sort({ createdAt: -1 });
  },

  updateById(id: string, data: Record<string, unknown>) {
    return Publication.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true });
  },

  incrementSubscribers(id: string, amount: 1 | -1) {
    return Publication.findByIdAndUpdate(id, { $inc: { subscriberCount: amount } }, { new: true });
  },
};
