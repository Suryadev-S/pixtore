import mongoose, { model, models, Schema } from "mongoose";

const likeSchema = new Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Posts"
    },
    userId: String,
},{
    timestamps: true,
})

const Likes = models.Like || model("Like",likeSchema);

export default Likes;