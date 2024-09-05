import Comment from "@/lib/models/Comment";
import { dbConnect } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    try {
        dbConnect();
        const fromReq = await req.json();
        const newComment = await new Comment(fromReq);
        await newComment.save();

        return NextResponse.json(newComment);
    } catch (error) {
        console.log(error);
        return NextResponse.json("error posting comment");
    }
}