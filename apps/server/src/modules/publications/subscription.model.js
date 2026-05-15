import mongoose, { Schema } from "mongoose";
const subscriptionSchema = new Schema(
  {
    publicationId: {
      type: Schema.Types.ObjectId,
      ref: "Publication",
      required: true,
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "unsubscribed"],
      default: "active",
    },
    source: {
      type: String,
      default: "web",
    },
  },
  {
    timestamps: true,
  },
);
subscriptionSchema.index({ publicationId: 1, email: 1 }, { unique: true });
export const Subscription = mongoose.model("Subscription", subscriptionSchema);
