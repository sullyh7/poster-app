import Link from 'next/link'
import React from 'react'

const Hero = () => {
  return (
    <div className='flex flex-col'>
        <div className='p-5'>
            <h1 className="md:text-8xl text-5xl gradient_text font-extrabold">A New Way To Catch Up On The Latest News</h1>
            <Link href={"/login"} className='btn mt-5 w-[10rem]'>View Your Feed</Link>
        </div>
        
        <div className='mt-[15rem] flex flex-col md:text-7xl text-5xl w-full text-center'>
            <h1>Let everyone know your opinions about <span className="gradient_text">Anything.</span></h1>
        </div>

        <div className='my-[15rem] flex flex-col md:text-7xl text-5xl text-center'>
            <h1>Have something on your mind you want people to know? <span className="gradient_text">Just make a post!</span></h1>
        </div>
    </div>
    
  )
}

export default Hero;