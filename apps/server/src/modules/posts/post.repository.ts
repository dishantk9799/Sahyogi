import mongoose from "mongoose";
import { Post } from "./post.model";

export const postsRepository = {
  create(data: Record<string, unknown>) {
    return Post.create(data);
  },

  findPublished(params: { search?: string; tag?: string; limit: number; cursor?: string }) {
    const query: Record<string, unknown> = {
      status: "published",
    };

    if (params.search) {
      query.$text = { $search: params.search };
    }

    if (params.tag) {
      query.tags = params.tag;
    }

    if (params.cursor) {
      query.publishedAt = { $lt: new Date(params.cursor) };
    }

    return Post.find(query).sort({ publishedAt: -1, createdAt: -1 }).limit(params.limit);
  },

  findBySlug(slug: string) {
    return Post.findOne({ slug: slug.toLowerCase(), status: "published" });
  },

  findById(id: string) {
    return Post.findById(id);
  },

  findByAuthor(authorId: string) {
    return Post.find({ authorId: new mongoose.Types.ObjectId(authorId) }).sort({ updatedAt: -1 });
  },

  updateById(id: string, data: Record<string, unknown>) {
    return Post.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true });
  },

  countByAuthor(authorId: string) {
    return Post.countDocuments({ authorId });
  },
};
