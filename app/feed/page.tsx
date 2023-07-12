"use client";

import Post from '@/components/Post';
import { PostResp } from '@/types/types';
import { Database } from '@/types/types_db';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import React, { useEffect, useState } from 'react'

const HomeFeed = () => {
    const supabaseClient = createClientComponentClient<Database>()
    const [data, setData] = useState<PostResp[] | null>(null)
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setError(null);
        supabaseClient
        .from("posts")
        .select("*, profiles(username)").order("created_at", {ascending: false})
        .then(({data, error}) => {
            
            if (error) {
                setError("Error loading posts")
            }
            setData(data);

        });
    }, [])
    

    return  (
    <div className='flex flex-col w-full gap-10'>
        {error && <h1>{error}</h1>}
        {data?.map(post => 
            <Post key={post.id} {...post}/>)}
    </div>
  ) 
}

export default HomeFeed;