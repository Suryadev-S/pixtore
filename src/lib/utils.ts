import { type ClassValue, clsx } from "clsx"
import mongoose from "mongoose";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function dbConnect(){
  const mongo_uri = process.env.MONGODB_URL;
  try {
    if(mongo_uri){
      mongoose.connect(mongo_uri);
    }else{
      throw Error("no mongo uri in env");
    }
  } catch (error) {
    console.log(error);
  }
}