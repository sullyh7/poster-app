import Post from '@/components/Post';
import { Database } from '@/types/types_db';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/dist/client/components/headers';
import React, { useEffect } from 'react'

const HomeFeed = async () => {
    const supabaseClient = createServerComponentClient<Database>({ cookies })

    const { data, error } = await supabaseClient
        .from("posts")
        .select("*, profiles(username)").order("created_at", {ascending: false});


    return  (
    <div className='flex md:min-w-[35rem] justify-center items-center flex-col w-full gap-10'>
        {data?.map(post => 
            <Post key={post.id} {...post}/>)}
    </div>
  ) 
}

export default HomeFeed;