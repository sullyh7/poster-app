"use client";

import Post from '@/components/Post';
import { PostResp } from '@/types/types';
import { Database } from '@/types/types_db';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/dist/client/components/headers';
import React, { useEffect, useState } from 'react'

const HomeFeed = () => {
    const supabaseClient = createServerComponentClient<Database>({ cookies })
    const [data, setData] = useState<PostResp[] | null>(null)
    const [error, setError] = useState<string | null>(null);

    const loadPosts = async () => {
        setError(null);
        try {
            const { data, error } = await supabaseClient
            .from("posts")
            .select("*, profiles(username)").order("created_at", {ascending: false});

            if (error) {
                throw new Error();
            }
            setData(data);
        } catch (e) {
            setError("Error loading posts");
        }
    }

    useEffect(() => {
        loadPosts();
    })
    

    return  (
    <div className='flex flex-col w-full gap-10'>
        {error && <h1>{error}</h1>}
        {data?.map(post => 
            <Post key={post.id} {...post}/>)}
    </div>
  ) 
}

export default HomeFeed;