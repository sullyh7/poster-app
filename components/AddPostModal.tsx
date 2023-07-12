"use client";

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const AddPostModal = () => {
    const {session, supabaseClient, isLoading} = useSessionContext();
    const [content, setContent] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (!session && !isLoading) {
            router.push("/login");
        }
    })
    

    const submitPost = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        try {
            const {error} = await supabaseClient.from("posts").insert(
                {
                    content: content,
                    user_id: session?.user.id
                }
            )
            router.refresh();
            if(error) {
                throw new Error();
            }
        } catch (e) {
            console.log(e);
        }
        setContent("");
    }

  return (
    <dialog id="addPostModal" className="modal modal-bottom sm:modal-middle">
        <form method="dialog" className="modal-box">
        <h3 className="font-bold text-lg">Add a post.</h3>
        <textarea onChange={e => setContent(e.target.value)} value={content} className='input' placeholder='Post content here'></textarea>
        <div className="modal-action">
            <button className='btn btn-primary' onClick={submitPost}>Post</button>
         <button className="btn">Close</button>
        </div>
        </form>
    </dialog>
  )
}

export default AddPostModal