import Post from "@/lib/models/Post";
import { dbConnect } from "@/lib/utils";
import { NextResponse, NextRequest } from "next/server";
import { v2 as cloudinary } from "cloudinary"
import Likes from "@/lib/models/Likes";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        dbConnect();
        const searchParams = req.nextUrl.searchParams;
        const assetPublicId = searchParams.get('assetPublicId');
        const deleted = await Post.findByIdAndDelete(params.id);
        await Likes.findOneAndDelete({ postId: params.id });
        if (assetPublicId) {
            cloudinary.uploader.destroy(assetPublicId, { type: 'upload', resource_type: 'image' })
                .then(() => {
                    console.log("deleted")
                });
        }

        return NextResponse.json(deleted);
    } catch (error) {
        console.log(error);
        return NextResponse.json("error deleting");
    }
}