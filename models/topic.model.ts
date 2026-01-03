import mongoose, { Schema } from "mongoose";

const topicSchema = new Schema(
  {
    title: String,
    avatar: String,
    description: String,
    slug: String,
    deleted: {
      type: Boolean,
      default: false,
    },
    deleteAt: Date,
  },
  {
    timestamps: true,
  }
);

const Topic = mongoose.model("Topic", topicSchema, "topics");
export default Topic;
