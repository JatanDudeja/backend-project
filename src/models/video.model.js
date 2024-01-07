import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
  {
    videoFile: {
        type: String, // Cloudinary url
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration:{
        type: Number, // from Cloudinary
        required: true
    },
    views:{
        type: Number,
        default: 0
    },
    isPublished:{
        type: boolean,
        default: true
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User",
        default: true
    },
  },
  {
    timestamps,
  }
);

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = new mongoose.model("Video", videoSchema);
