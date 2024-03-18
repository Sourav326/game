'use client'

import { useState ,useEffect} from "react"
import Header from "./Header"
import { usePathname, useSearchParams } from 'next/navigation'
import Footer from "./Footer"
import { Toaster } from 'sonner'


const MainLayout = ({children}) => {
    const [user, setUser] = useState(null)
    const [change, setChange] = useState(0)
    const pathname = usePathname()
    const searchParams = useSearchParams()
    useEffect(() => {
        const token = localStorage.getItem("JWTtoken")
        if(token){
            setUser(token)
            setChange(Math.random())
        }
    }, [pathname,searchParams])

    
  return (
          <>
          <Toaster richColors expand={true} position="top-center"  />
            <Header user={user} setUser={setUser} change={change} />
            <div className='py-4'>
                {children}
            </div>
            <Footer />
          </>
  )
}

export default MainLayout