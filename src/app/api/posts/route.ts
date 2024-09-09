import Likes from "@/lib/models/Likes";
import Post from "@/lib/models/Post";
import { dbConnect } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { userId } = auth();
    const searchParams = req.nextUrl.searchParams;
    const page = searchParams.get('page')
    try {
        dbConnect();
        const allUserPosts = page === 'home' ? await Post.find().sort({ createdAt: -1 }).limit(10) : await Post.find({ userId: userId }).limit(10);
        const allPostIds = allUserPosts.map(post => post._id.toString());
        const likedPosts = await Likes.find({ userId: userId, postId: { $in: allPostIds } }, { postId: true });
        const response = allUserPosts.map((post) => {
            for (let like of likedPosts) {
                if (post._id.toString() == like.postId.toString()) {
                    return { ...post._doc, isLiked: true };
                }
            }
            return { ...post._doc, isLiked: false };
        })
        return NextResponse.json(response);
        // if (userId) {
        // }
    } catch (error) {
        console.log(error, "this is the error");
        return NextResponse.json("error getting posts");
    }
}

export async function POST(req: Request) {
    try {
        dbConnect();
        const fromReq = await req.json();
        const newPost = await new Post(fromReq);
        await newPost.save();

        return NextResponse.json("successfully created post");
    } catch (error) {
        console.log(error);
        return NextResponse.json("error creating post");
    }
}