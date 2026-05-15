import mongoose from "mongoose";
import { Post } from "./post.model.js";

const postRelations = [
  {
    path: "authorId",
    select: "fullName username avatarUrl bio",
  },
  {
    path: "publicationId",
    select: "name slug tagline logoUrl accentColor",
  },
];

function withPostRelations(query) {
  return query.populate(postRelations);
}

export const postsRepository = {
  create(data) {
    return Post.create(data);
  },
  populateRelations(post) {
    return post.populate(postRelations);
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
    if (params.publicationId) {
      query.publicationId = new mongoose.Types.ObjectId(params.publicationId);
    }
    if (params.cursor) {
      query.publishedAt = { $lt: new Date(params.cursor) };
    }
    return withPostRelations(
      Post.find(query).sort({ publishedAt: -1, createdAt: -1 }).limit(params.limit),
    );
  },
  findBySlug(slug) {
    return withPostRelations(Post.findOne({ slug: slug.toLowerCase(), status: "published" }));
  },
  findAnyBySlug(slug) {
    return Post.findOne({ slug: slug.toLowerCase() }).select("_id");
  },
  findById(id) {
    return withPostRelations(Post.findById(id));
  },
  findByAuthor(authorId) {
    return withPostRelations(
      Post.find({ authorId: new mongoose.Types.ObjectId(authorId) }).sort({ updatedAt: -1 }),
    );
  },
  updateById(id, data) {
    return withPostRelations(
      Post.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true }),
    );
  },
  countByAuthor(authorId) {
    return Post.countDocuments({ authorId });
  },
};
