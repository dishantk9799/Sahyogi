import mongoose, { Schema, type HydratedDocument } from "mongoose";

export type SubscriptionShape = {
  publicationId: mongoose.Types.ObjectId;
  userId?: mongoose.Types.ObjectId;
  email: string;
  status: "active" | "unsubscribed";
  source: string;
  createdAt: Date;
  updatedAt: Date;
};

export type SubscriptionDocument = HydratedDocument<SubscriptionShape>;

const subscriptionSchema = new Schema<SubscriptionShape>(
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

export const Subscription = mongoose.model<SubscriptionShape>("Subscription", subscriptionSchema);
