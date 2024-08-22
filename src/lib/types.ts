export interface Post {
    userId: string | undefined;
    username: string | null | undefined;
    avatarUrl: string | undefined;
    assetUrl: string;
    assetPublicId: string;
    title: string;
    description: string;
    albumId?: string | null;
}