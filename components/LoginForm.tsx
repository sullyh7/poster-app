"use client";

import { useSessionContext } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const LoginForm = () => {

  const {supabaseClient, session, isLoading} = useSessionContext();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (session) {
      router.push("/feed")
    }
  })

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      const {error, data} = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password
      });
      if (error) {
        throw new Error();
      }
      router.push("/feed")
    } catch (e) {
      setError("Error")
    }
  }
  return (
    <form onSubmit={onSubmit} className='gap-5 py-10 flex flex-col justify-center'>
    <div className='flex flex-col'>
        <label htmlFor='email'>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} className='input input-bordered w-full max-w-xs' id='email' type="email" required/>
        <label htmlFor='pass'>Password</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)}  className='input input-bordered w-full max-w-xs' id='pass' type="password" minLength={7} required/>
    </div>
    <input className='btn btn-primary' value="Signin" type='submit'/>
    <h1 className='text-warning'>{error}</h1>
</form>
  )
}

export default LoginForm