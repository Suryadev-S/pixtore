import Likes from "@/lib/models/Likes";
import { dbConnect } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    try {
        dbConnect();
        const fromReq = await req.json();
        const isAlreadyLiked = await Likes.findOne(fromReq); //check if already liked
        if(isAlreadyLiked){
            const deleted = await Likes.findOneAndDelete(fromReq);
            return NextResponse.json(deleted);
        }
        const newLike = await new Likes(fromReq);
        await newLike.save();
        return NextResponse.json(newLike);
    } catch (error) {
        console.log(error);
        return NextResponse.json("error like route");
    }
}