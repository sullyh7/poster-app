export interface UserProfile {
    username: string,
    avatarUrl: string,
}

export interface Post {
    createdAt: string,
    content: string,
    likes: number,
    dislikes: number,
}