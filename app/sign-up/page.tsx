import { SignupForm } from '@/components/SignupForm';
import React from 'react'

const Signup = () => {
  return (
    <div className='flex flex-col items-center'>
        <h1 className='text-3xl gradient_text'>Unlock a new world of social interaction!</h1>
        <h2>Fill in the form below.</h2>
        <SignupForm/>
    </div>
  )
}

export default Signup;