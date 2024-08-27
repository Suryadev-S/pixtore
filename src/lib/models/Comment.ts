import mongoose, { model, models, Schema } from "mongoose";

const commentSchema = new Schema({
    userId: String,
    username: String,
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    avatarUrl: String,
    comment: String,
},{
    timestamps: true,
});

const Comment = models.Comment || model("Comment",commentSchema);

export default Comment;