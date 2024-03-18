'use client'

import { useState, useEffect } from "react"
import Header from "./Header"
import { usePathname, useSearchParams } from 'next/navigation'
import Footer from "./Footer"
import { Toaster } from 'sonner'


const MainLayout = ({ children }) => {
  const [user, setUser] = useState(null)
  const [change, setChange] = useState(0)
  const pathname = usePathname()
  const searchParams = useSearchParams()
  useEffect(() => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAeW9wbWFpbC5jb20iLCJfaWQiOiI2NWE3OWM0OTg3YjUwZTI4MjhjYmVhYWQiLCJyb2xlIjoidXNlciIsImlhdCI6MTcwOTAxNjM3MywiZXhwIjoxNzExNjA4MzczfQ.kuJEQqHPLARdCtHU9HA7UYFZJhG2qjfpbA1nDLY88YE'

    if (token) {
      setUser(token)
      setChange(Math.random())
    }
  }, [pathname, searchParams])


  return (
    <>
      <Toaster richColors expand={true} position="top-center" />
      <Header user={user} setUser={setUser} change={change} />
      <div className='py-4'>
        {children}
      </div>
      <Footer />
    </>
  )
}

export default MainLayout