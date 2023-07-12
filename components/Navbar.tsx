import Link from 'next/link'
import LoginStatus from './LoginStatus'

const Navbar = () => {
  return (
    <div className='p-5 flex justify-between items-center w-full'>
        <Link href={"/"} className='md:text-3xl text-xl font-bold text-primary mr-10'>Poster
        <span className='text-accent'>App</span></Link>
        <LoginStatus/>
    </div>
  )
}

export default Navbar