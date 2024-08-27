import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Post, Like } from "../types";



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
            const prevListState = queryClient.getQueryData(['userPosts']);

            queryClient.setQueryData(['userPosts'], (old: Post[]) => {
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
            queryClient.setQueryData(['userPosts'], context?.prevListState);
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["userPosts"]
            })
        }
    })

    return mutation;
}