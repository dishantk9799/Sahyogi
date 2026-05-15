import { Subscription } from "./subscription.model.js";
export const subscriptionsRepository = {
  findActive(publicationId, email) {
    return Subscription.findOne({ publicationId, email, status: "active" });
  },
  create(data) {
    return Subscription.create(data);
  },
  countByPublication(publicationId) {
    return Subscription.countDocuments({ publicationId, status: "active" });
  },
};
