import { Subscription } from "./subscription.model.js";

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export const subscriptionsRepository = {
  findActive(publicationId, email) {
    return Subscription.findOne({ publicationId, email, status: "active" });
  },
  findByPublicationAndEmail(publicationId, email) {
    return Subscription.findOne({ publicationId, email: email.toLowerCase() });
  },
  findActiveByPublication(publicationId, params = {}) {
    const query = { publicationId, status: "active" };

    if (params.search) {
      query.email = new RegExp(escapeRegex(params.search), "i");
    }

    return Subscription.find(query)
      .sort({ createdAt: -1 })
      .limit(params.limit ?? 50);
  },
  create(data) {
    return Subscription.create(data);
  },
  updateStatus(id, status) {
    return Subscription.findByIdAndUpdate(
      id,
      { $set: { status } },
      { new: true, runValidators: true },
    );
  },
  countByPublication(publicationId) {
    return Subscription.countDocuments({ publicationId, status: "active" });
  },
};
