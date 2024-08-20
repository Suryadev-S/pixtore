import mongoose, { model, models, Schema } from "mongoose";

const albumSchema = new Schema({
    name: String,
    description: String,
    postId: [{type: mongoose.Schema.Types.ObjectId, ref: "Post"}],
    isPublic: {
        type: Boolean,
        default: true,
    }
},{
    timestamps: true,
})

const Album = models.Album || model("Album",albumSchema);

export default Album;