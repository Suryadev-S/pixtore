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