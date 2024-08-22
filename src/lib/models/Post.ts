import mongoose, { model, models, Schema } from "mongoose";

const postSchema = new Schema({
    userId: String,
    title: String,
    description: String,
    username: String,
    avatarUrl: String,
    assetUrl: String,
    assetPublicId: String,
    isPrivate: {
        type: Boolean,
        default: false,
    },
    albumId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Album",
    }
},{
    timestamps: true,
})

const Post = models.Post || model("Post", postSchema);

export default Post;