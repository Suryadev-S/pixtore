import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { useUser } from "@clerk/nextjs";
import { Skeleton } from "../skeleton";
import { Button } from "../button";
import { ChangeEvent, useState } from "react";
import { Comment } from "@/lib/types";
import { useCreateComment } from "@/lib/queriesAndMutations/mutations";
import { SendHorizontal } from 'lucide-react';


const CommentSection = ({ comments, isLoading, postId }: { comments: Comment[], isLoading: boolean, postId: string | undefined }) => {
    const { user } = useUser();
    const createComment = useCreateComment();
    const [inputComment, setInputComment] = useState('');
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setInputComment(e.target.value);
    }
    const handleCreateComment = () => {
        createComment.mutate({
            userId: user?.id,
            username: user?.username,
            avatarUrl: user?.imageUrl,
            postId,
            comment: inputComment,
        })
        setInputComment('');
    }
    return (
        <div className="mb-5">
            <div className="flex">
                {/* <Avatar className="w-7 h-7">
                    <AvatarImage src={user?.imageUrl} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar> */}
                <Textarea className="bg-slate-900 text-white border-none"
                    placeholder="write your thoughts"
                    value={inputComment}
                    onChange={handleChange} />
                <Button size={'icon'} className="bg-sky-600" onClick={handleCreateComment}><SendHorizontal className="stroke-1"/></Button>
            </div>
            {isLoading ?
                (
                    <Skeleton className="w-full rounded-md h-4" />
                ) :
                (
                    <ul className="mt-2">
                        {comments.length == 0 && <li>No comments yet</li>}
                        {comments.length != 0 && (
                            comments.map((comment, i) => (
                                <li key={i}>
                                    <div>
                                        <Avatar className="w-6 h-6 inline-block align-middle">
                                            <AvatarImage src={comment.avatarUrl} />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        <small className="text-slate-500"><b>_@{comment.username}_</b></small>
                                        <small>
                                            {comment.comment}
                                        </small>
                                    </div>
                                </li>
                            ))
                        )}
                    </ul>
                )}
            <ul>
            </ul>
        </div>
    )
}

export default CommentSection;