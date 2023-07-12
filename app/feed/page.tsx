import Post from '@/components/Post';
import { Database } from '@/types/types_db';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/dist/client/components/headers';
import React from 'react'

const HomeFeed = async () => {
    const supabaseClient = createServerComponentClient<Database>({ cookies })
    
    const { data, error } = await supabaseClient
        .from("posts")
        .select("*, profiles(username)").order("created_at", {ascending: false});


    return data && data.length > 0 ? (
    <div className='flex flex-col w-full gap-10'>
        {data?.map(post => 
            <Post key={post.id} {...post}/>)}
    </div>
  ) : 
  <div className='flex flex-col w-full gap-10 text-4xl'>
        <h1>No Posts</h1> 
    </div>
}

export default HomeFeed;