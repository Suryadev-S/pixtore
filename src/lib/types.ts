export interface Post {
    _id?: string; 
    userId: string | undefined;
    username: string | null | undefined;
    avatarUrl: string | undefined;
    assetUrl: string;
    assetPublicId: string;
    title: string;
    description: string;
    albumId?: string | null;
    isLiked?: boolean
}

export interface Like{
    _id?: string,
    userId: string | undefined,
    postId: string | undefined
}