"use client";

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { revalidatePath } from 'next/cache';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const AddPostModal = () => {
    const {session, supabaseClient, isLoading} = useSessionContext();
    const [content, setContent] = useState("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (!session && !isLoading) {
            router.push("/login");
        }
    })
    

    const submitPost = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setError(null);
        try {

            if (content.length < 5) {
                throw new Error();
            }
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
        } catch (err: any) {
            e.preventDefault();
            setError(err.toString());
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
        <h1>{error && "Error posting, check your post is more than 5 characters!"}</h1>
        </form>
    </dialog>
  )
}

export default AddPostModal