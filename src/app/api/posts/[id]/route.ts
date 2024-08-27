import Post from "@/lib/models/Post";
import { dbConnect } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        dbConnect();
        const deleted = await Post.findByIdAndDelete(params.id);
    } catch (error) {
        console.log(error);
        return NextResponse.json("error deleting");
    }
}