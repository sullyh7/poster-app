export interface UserProfile {
    username: string,
    avatarUrl: string,
}


export interface PostResp {
    content: string | null;
    created_at: string | null;
    dislikes: number | null;
    id: number;
    likes: number | null;
    user_id: string | null;
    profiles: {
        username: string | null;
    } | null;
}