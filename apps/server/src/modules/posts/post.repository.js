import mongoose from "mongoose";
import { Post } from "./post.model.js";
export const postsRepository = {
  create(data) {
    return Post.create(data);
  },
  findPublished(params) {
    const query = {
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
  findBySlug(slug) {
    return Post.findOne({ slug: slug.toLowerCase(), status: "published" });
  },
  findById(id) {
    return Post.findById(id);
  },
  findByAuthor(authorId) {
    return Post.find({ authorId: new mongoose.Types.ObjectId(authorId) }).sort({ updatedAt: -1 });
  },
  updateById(id, data) {
    return Post.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true });
  },
  countByAuthor(authorId) {
    return Post.countDocuments({ authorId });
  },
};
