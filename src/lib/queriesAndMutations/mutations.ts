import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Post } from "../types";

export const useCreatePost = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (newPost: Post) => {
            const res = await fetch('/api/post', {
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