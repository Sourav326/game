'use client'

import { usePathname } from 'next/navigation'
import Footer from "./Footer"
import Header from "./Header"
import Sidebar from "./Sidebar"
import { IoHome } from "react-icons/io5";
import { useState } from 'react';
import { Toaster } from 'sonner'

const MainLayout = ({children}) => {
  const pathname = usePathname()
  const [user, setUser] = useState(null)
  const replacePath = pathname.replaceAll("/", '  |  ')
  const[isCollapsed,setIsCollapsed] = useState(false)
  return (
          <div className='flex'>
            <Toaster richColors expand={true} position="top-center"  />
            <Sidebar  isCollapsed = {isCollapsed} />
            <div className="dark:bg-gray-500 bg-violet-100 w-full">
              <Header onIsCollapsed = {setIsCollapsed} user={user} setUser={setUser}/>
                <div className="p-4 md:p-14">
                  <div className="flex text-sm font-semibold mb-8 items-center gap-3">
                    <button type="button" className="px-3 py-2.5 text-center me-2 text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded"> <IoHome /></button>
                    <span className='capitalize text-gray-500'>{replacePath}</span>
                  </div>
                  {children}
                </div>
            </div>
          </div>
        )
}

export default MainLayout