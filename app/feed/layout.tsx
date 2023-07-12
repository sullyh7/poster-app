import Sidebar from '@/components/Sidebar';
import React from 'react'

interface FeedLayoutProps {
    children: React.ReactNode;
}

const FeedLayout = ({children}: FeedLayoutProps) => {
  return (
    <div className='p-3 md:p-10 flex flex-col md:flex-row justify-between'>
        <div className='flex-col flex'>
            <Sidebar/>
        </div>
        <div className='mr-[10rem]'>
            {children}
        </div>
            
    </div>
  )
}

export default FeedLayout