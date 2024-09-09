'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Loader from "@/components/ui/custom/Loader";
import { useQueryPost } from "@/lib/queriesAndMutations/queries";
import { Post } from "@/lib/types";
import { useUser } from "@clerk/nextjs";
import { CldImage } from "next-cloudinary";
import { Key } from "react";

const Profile = () => {
    const { user } = useUser();
    const query = useQueryPost();
    return (
        <main className="wrapper">
            <header className="flex gap-2 items-center">
                <Avatar className='w-12 h-12'>
                    <AvatarImage src={user?.imageUrl} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <h1 className="text-slate-500 text-xl">
                    <b>@{user?.username}</b>
                </h1>
            </header>
            <ul className="grid grid-cols-3 mt-4">
                {query.isLoading && <li className="col-span-3"><Loader fillCount={2} className="w-full" /></li>}
                {query.data && <>
                    {query.data.length === 0 ?
                        <li className="bg-black col-span-3">
                            <img src={'social.svg'} />
                            <h1 className="text-slate-500 font-bold text-center">No posts as of now.<br /> Tap the pen icon to start uploading</h1>
                        </li> :
                        (
                            query.data.map((post: Post, i: Key) => (
                                <li key={i}>
                                    <CldImage src={post.assetUrl} width={'150'} height={'150'} alt="postImage" className="rounded-md" />
                                </li>
                            ))
                        )}
                </>}
            </ul>
        </main>
    )
}

export default Profile;