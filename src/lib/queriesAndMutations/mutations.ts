import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Post, Like, Comment } from "../types";



export const useCreatePost = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (newPost: Post) => {
            const res = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(newPost),
            });
            const { data } = await res.json();
            return data;
        },
        onError: (error, variables, context) => {
            console.log(error);
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["userPosts"]
            })
        }
    });

    return mutation;
}

export const useLikePost = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (like: Like) => {
            const res = await fetch('/api/likes', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(like),
            })
            const data = await res.json();
            return data;
        },
        onMutate: (like) => {
            const prevListState = queryClient.getQueryData(['homeFeed']);

            queryClient.setQueryData(['homeFeed'], (old: Post[]) => {
                const updatedPosts = old.map((post) => {
                    if (post._id === like.postId) {
                        return { ...post, isLiked: !post.isLiked }
                    }
                    return post
                });

                return updatedPosts;
            })

            return { prevListState };
        },
        onError: (err, like, context) => {
            alert("error in like mutation");
            queryClient.setQueryData(['homeFeed'], context?.prevListState);
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["homeFeed"]
            })
        }
    })

    return mutation;
}

export const useDeletePost = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async ({ postId, assetPublicId }: { postId: string | undefined, assetPublicId: string }) => {
            const res = await fetch(`/api/posts/${postId}?assetPublicId=${assetPublicId}`, {
                method: 'DELETE'
            })
            const data = await res.json();
            return data;
        },
        onMutate: ({ postId, assetPublicId }: { postId: string | undefined, assetPublicId: string }) => {
            const prevList = queryClient.getQueryData(["userPosts"]);

            queryClient.setQueryData(["userPosts"], (old: Post[]) => {
                const updatedList = old.filter(post => post._id !== postId);
                return updatedList;
            });

            return { prevList };
        },
        onError: (error, postId, context) => {
            console.log(error);
            queryClient.setQueryData(["userPosts"], context?.prevList);
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["userPosts"]
            })
        }

    })

    return mutation;
}

export const useCreateComment = () => {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: async (userComment: Comment) => {
            const res = await fetch('/api/comments', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(userComment)
            });
            const data = await res.json();
            return data;
        },
        onMutate: (userComment: Comment) => {
            const previous = queryClient.getQueryData(['userComments', userComment.postId]);
            queryClient.setQueryData(['userComments',userComment.postId],(old: Comment[])=>{
                const updatedList = [userComment, ...old];
                return updatedList;
            })
            return { previous }
        },
        onError: (error, userComment: Comment, context) => {
            console.log(error);
            queryClient.setQueryData(['userComments', userComment.postId], context?.previous);
        },
        onSettled: (userComment) => {
            queryClient.invalidateQueries({
                queryKey: ['userComments', userComment.postId]
            })
        }
    });

    return mutate;
}