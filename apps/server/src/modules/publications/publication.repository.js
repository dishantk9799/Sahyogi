import { Publication } from "./publication.model.js";
export const publicationsRepository = {
  create(data) {
    return Publication.create(data);
  },
  findBySlug(slug) {
    return Publication.findOne({ slug: slug.toLowerCase() });
  },
  findById(id) {
    return Publication.findById(id);
  },
  findByOwner(ownerId) {
    return Publication.find({ ownerId }).sort({ createdAt: -1 });
  },
  updateById(id, data) {
    return Publication.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true });
  },
  incrementSubscribers(id, amount) {
    return Publication.findByIdAndUpdate(id, { $inc: { subscriberCount: amount } }, { new: true });
  },
};
