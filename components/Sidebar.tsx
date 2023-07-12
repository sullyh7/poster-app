"use client"
import { useSession, useSessionContext } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from 'react'
import { IconType } from "react-icons";

import { BiSolidHome } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs"
import AddPostModal from "./AddPostModal";

interface SidebarItemProps {
    icon: IconType,
    label: string,
    active?: boolean,
    href: string,
    size?: string,
}

const SidebarItem: React.FC<SidebarItemProps> = ({
    icon: Icon, label, active, href, size
}) => {
  return (
    <Link href={href}
    className="flex gap-x-3 text-grey justify-center items-center">
        <Icon size={size === "large" ? 70 : 30}/>
        <p className="truncate w-full">{label}</p>
    </Link>
  )
}

const Sidebar = () => {
    const {session, isLoading} = useSessionContext();
    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter();

    const showModal = () => {
      window.addPostModal.showModal()
    }

    // const closeModal = () => {
    //   window.addPostModal.closeModal();
    // }

    useEffect(() => {
        if (!session && !isLoading) {
            router.push("/login")
        }
    })

    const pathName = usePathname();
    const routes = useMemo(() => { console.log(pathName); return [
      {
        icon: BiSolidHome,
        label: "Home",
        active: pathName !== "/feed",
        href: "/feed",
      },
      {
        icon: BsFillPersonFill,
        label: "Profile",
        active: pathName === "/feed/profile",
        href: "/feed/profile",
      }
    ]}, [pathName])
  return (
    <div>
        <div className="gap-8 hidden md:flex flex-col justify-start h-full">
            {routes.map(route => 
                <SidebarItem {...route} size="large" key={route.label} />)
            }
            <button className='btn btn-primary' onClick={showModal}>Add Post</button>
        </div>

        <div className="flex justify-between">
            <div className="dropdown md:hidden dropdown-right">
            <label tabIndex={0} className="btn m-1 btn-sm ">Menu</label>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                {routes.map(route => 
                <SidebarItem {...route} key={route.label} />)
            }
                </ul>
            </div>
            <button className="md:hidden btn btn-primary btn-sm" onClick={showModal}>Add Post</button>

            {/* Open the modal using ID.showModal() method */}
            <AddPostModal />
        </div>
    </div>
    
  )
}

export default Sidebar