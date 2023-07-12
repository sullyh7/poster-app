import LoginForm from '@/components/LoginForm'
import React from 'react'

const Login = () => {
  return (
    <div className='flex flex-col items-center my-10'>
        <h1 className='text-3xl gradient_text'>Sign in</h1>
        <h2>Fill in the form below.</h2>
        <LoginForm />
    </div>
  )
}

export default Login