import Post from "@/lib/models/Post";
import { dbConnect } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
    const { userId } = auth();
    try {
        dbConnect();
        const allUserPosts = await Post.find({ userId: userId });
        return NextResponse.json(allUserPosts);
    } catch (error) {
        console.log(error, "this is the error");
        return NextResponse.json("error getting posts");
    }
}