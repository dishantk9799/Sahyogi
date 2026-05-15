import { Post } from "../posts/post.model";
import { Publication } from "../publications/publication.model";
import { Subscription } from "../publications/subscription.model";
import type { SafeUser } from "../users/user.types";

export const dashboardService = {
  async overview(user: SafeUser) {
    const publications = await Publication.find({ ownerId: user.id }).select("_id");
    const publicationIds = publications.map((publication) => publication._id);

    const [posts, publishedPosts, subscribers, drafts] = await Promise.all([
      Post.countDocuments({ authorId: user.id }),
      Post.countDocuments({ authorId: user.id, status: "published" }),
      Subscription.countDocuments({ publicationId: { $in: publicationIds }, status: "active" }),
      Post.countDocuments({ authorId: user.id, status: "draft" }),
    ]);

    return {
      publications: publications.length,
      posts,
      publishedPosts,
      drafts,
      subscribers,
      estimatedMonthlyReads: publishedPosts * 420,
    };
  },
};
