import { Like, Post } from '@/lib/types';
import { CldImage } from 'next-cloudinary';
import { Heart, Ellipsis } from 'lucide-react';
import { useLikePost } from '@/lib/queriesAndMutations/mutations';
import { toast } from '../use-toast';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '../button';



export default function PreviewCard({ post }: { post: Post }) {
    const triggerLike = useLikePost();
    const handleLikePost = (like: Like) => {
        triggerLike.mutate(like);
        if (triggerLike.error) {
            toast({
                variant: "destructive",
                title: "error in like"
            })
            return
        }
        toast({
            title: "liked the post"
        })
    }
    return (
        <div className="inline-block">
            <header className='text-slate-500 flex items-center gap-4 bg-slate-800 py-2 px-4'>
                <Avatar className='w-7 h-7'>
                    <AvatarImage src={post.avatarUrl} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <small className='mr-auto'>
                    <b>@{post.username}</b>
                </small>
                <DropdownMenu>
                    <DropdownMenuTrigger><Ellipsis /></DropdownMenuTrigger>
                    <DropdownMenuContent className="border-2 border-slate-600 bg-slate-800 text-white">
                        <DropdownMenuItem className=''>
                           delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            </header>
            <div className='bg-black'>
                <div className='relative aspect-square w-[350px]'>
                    <CldImage
                        // width="400"
                        // height="0"
                        fill
                        src={post.assetPublicId}
                        alt={post.title}
                        className='object-contain'
                    />
                </div>
            </div>
            <div className='px-2 py-2'>
                <Heart className={`${post.isLiked ? "fill-red-400" : "stroke-slate-600"}`} onClick={() => handleLikePost({ userId: post.userId, postId: post._id })} />
            </div>
            <div className='text-slate-500'>
                <b>{post.title}</b> <span>{post.description}</span>
            </div>
        </div>
    )
}