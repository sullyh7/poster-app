"use client"

import { Database } from '@/types/types_db';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import React, { useState } from 'react'

export const SignupForm = () => {

    const supabaseClient = createClientComponentClient<Database>();
    const [error, setError] = useState<string | null>(null);

    const [status, setStatus] = useState("signup");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        if (password !== confirmPassword) {
            throw new Error();
        }
        try {
            console.log(process.env.VERCEL_URL)
            const {error, data} = await supabaseClient.auth.signUp({
                email: email,
                password: password,
                options: {
                    emailRedirectTo: `${location.origin}`,
                    data: {
                        username
                    }
                }
            });
            if (error) {
                throw new Error()
            }
        setStatus("email");
        } catch(e) {
            setError("Error signing up")
        }

        
    }

    switch(status) {
        case "signup": 
        return (
            <form onSubmit={onSubmit} className='gap-5 py-10 flex flex-col justify-center'>
                <div className='flex gap-5 w-full justify-center'>
                <div className='flex flex-col'>
                    <label htmlFor='username'>Username</label>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} className='input input-bordered w-full max-w-xs' id='username' type="text" minLength={3} required/>
                    <label htmlFor='pass'>Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)}  className='input input-bordered w-full max-w-xs' id='pass' type="password" minLength={7} required/>
                </div>
                
                <div className='flex flex-col'>
                    <label htmlFor='email' >Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)}  className='input input-bordered w-full max-w-xs' id='email' type="email" required/> 
                    <label htmlFor='conf-pass' >Confirm Password</label>
                    <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}  className='input input-bordered w-full max-w-xs' id='conf-pass' type="password" minLength={7} required/>
                </div>
                </div>
                <input className='btn btn-primary' value="Signup" type='submit'/>
                <h1 className='text-warning'>{error}</h1>
            </form>
            );
        case "email":
            return (
                <div className='flex justify-center'>
                    <h1 className='py-[10rem]'>Confirmation sent!</h1>
                </div>
            )
        default:
            return "";
    }
}
