import React from 'react'

interface PostProps {
    key: number;
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

const Post: React.FC<PostProps> = (post) => {
  return (
    <div className='card border p-5 w-full'>
        <h1 className='text-xl'>{post.content}</h1>
        <p className='text-accent'>@{post.profiles?.username}</p>
        <div className='text-xs'>
        </div>
       
    </div>
  )
}

export default Post