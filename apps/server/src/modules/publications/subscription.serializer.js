export function toSubscriptionDTO(subscription) {
  return {
    id: subscription._id.toString(),
    publicationId: subscription.publicationId.toString(),
    email: subscription.email,
    status: subscription.status,
    source: subscription.source,
    createdAt: subscription.createdAt,
    updatedAt: subscription.updatedAt,
  };
}
