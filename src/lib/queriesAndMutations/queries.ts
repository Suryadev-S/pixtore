import { useQuery } from "@tanstack/react-query"

export const useQueryPost = () => {
    const query = useQuery({
        queryKey: ['userPosts'],
        queryFn: async () => {
            const res = await fetch('/api/posts');
            const data = await res.json();
            return data;
        }
    });

    return query;
}

export const useGetComment = (postId: string | undefined) => {
    const query = useQuery({
        queryKey: ['userComments', postId],
        queryFn: async () => {
            const res = await fetch(`/api/comments/${postId}`);
            const data = await res.json();
            return data;
        },
        enabled: false,
    });

    return query;
}