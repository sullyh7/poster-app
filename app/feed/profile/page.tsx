import { Database } from '@/types/types_db';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/dist/client/components/headers';
import React from 'react'

const Profile = async () => {
  const supabaseClient = createServerComponentClient<Database>( { cookies } )
  const user = (await supabaseClient.auth.getUser());

  const { data, error } = await supabaseClient
        .from("profiles")
        .select("*").eq("id", user.data.user?.id).single();

  return (
    <div className='flex flex-col gap-5'>
      <h1 className='gradient_text text-3xl' >Profile Info:</h1>
      <p className='text-2xl'>@{data?.username}</p>
      <p className='text-2xl'>{user.data.user?.email}</p>
    </div>
  )
}

export default Profile;