import mongoose, { Schema } from "mongoose";
const postSchema = new Schema(
  {
    publicationId: {
      type: Schema.Types.ObjectId,
      ref: "Publication",
      required: true,
      index: true,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 140,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 160,
    },
    subtitle: {
      type: String,
      default: "",
      maxlength: 240,
    },
    coverImageUrl: {
      type: String,
      default: "",
    },
    content: {
      html: { type: String, default: "" },
      text: { type: String, default: "" },
      json: { type: Schema.Types.Mixed },
    },
    status: {
      type: String,
      enum: ["draft", "published", "scheduled", "archived"],
      default: "draft",
      index: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      default: "General",
    },
    readTimeMinutes: {
      type: Number,
      default: 1,
      min: 1,
    },
    seo: {
      title: { type: String, default: "" },
      description: { type: String, default: "" },
    },
    publishedAt: {
      type: Date,
      index: true,
    },
    scheduledFor: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);
postSchema.index({ slug: 1 }, { unique: true });
postSchema.index({ publicationId: 1, slug: 1 });
postSchema.index({ status: 1, publishedAt: -1 });
postSchema.index({ title: "text", subtitle: "text", "content.text": "text", tags: "text" });
export const Post = mongoose.model("Post", postSchema);
