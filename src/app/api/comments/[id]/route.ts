import Comment from "@/lib/models/Comment";
import { dbConnect } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        dbConnect();
        const comments = await Comment.find({ postId: params.id });
        return NextResponse.json(comments);
    } catch (error) {
        console.log(error);
        return NextResponse.json("error getting comments");
    }
}