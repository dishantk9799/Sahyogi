import { Subscription } from "./subscription.model";

export const subscriptionsRepository = {
  findActive(publicationId: string, email: string) {
    return Subscription.findOne({ publicationId, email, status: "active" });
  },

  create(data: { publicationId: string; email: string; source: string; userId?: string }) {
    return Subscription.create(data);
  },

  countByPublication(publicationId: string) {
    return Subscription.countDocuments({ publicationId, status: "active" });
  },
};
