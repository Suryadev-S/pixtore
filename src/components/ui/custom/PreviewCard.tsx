import { Like, Post } from '@/lib/types';
import { CldImage } from 'next-cloudinary';
import { Heart, Ellipsis, MessageCircle } from 'lucide-react';
import { useDeletePost, useLikePost } from '@/lib/queriesAndMutations/mutations';
import { toast } from '../use-toast';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from 'react';
import { useGetComment } from '@/lib/queriesAndMutations/queries';
import CommentSection from './CommentSection';



export default function PreviewCard({ post }: { post: Post }) {
    const [commentSection, setCommentSection] = useState(false);
    const { data: comments, refetch, isLoading } = useGetComment(post._id);
    const triggerLike = useLikePost();
    const handleDeletePost = useDeletePost();

    const toggleCommentSection = () => {
        setCommentSection(!commentSection);
        if (!commentSection) {
            refetch();
            return;
        }
        return;
    }
    const handleLikePost = (like: Like) => {
        triggerLike.mutate(like);
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
                {/* <DropdownMenu>
                    <DropdownMenuTrigger><Ellipsis /></DropdownMenuTrigger>
                    <DropdownMenuContent className="border-2 border-slate-600 bg-slate-800 text-white">
                        <DropdownMenuItem onClick={() => handleDeletePost.mutate({ postId: post._id, assetPublicId: post.assetPublicId })}>
                            {handleDeletePost.isPending ? "deleting" : "delete"}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu> */}

            </header>

            <div className='relative aspect-square md:w-[400px] w-[350px] bg-black'>
                <CldImage
                    fill
                    src={post.assetPublicId}
                    alt={post.title}
                    className='object-contain'
                />
            </div>
            <div className='px-2 py-2 flex gap-2'>
                <Heart className={`${post.isLiked ? "fill-red-400" : "stroke-slate-600"}`} onClick={() => handleLikePost({ userId: post.userId, postId: post._id })} />
                <MessageCircle onClick={toggleCommentSection} />
            </div>
            <div className='text-slate-500 mb-2'>
                <b>{post.title}</b> <span>{post.description}</span>
            </div>
            {commentSection && (
                <CommentSection comments={comments} isLoading={isLoading} postId={post._id} />
            )}
        </div>
    )
}