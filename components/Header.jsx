"use client"
import Image from 'next/image'
import Link from 'next/link'
import axios from "axios"
import { useRouter } from 'next/navigation'
import { toast } from "sonner";
import { useState } from 'react'
import Cookies from 'universal-cookie';
import { FaMoneyCheckDollar } from "react-icons/fa6";

const Header = ({ user, setUser, change }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const cookies = new Cookies(null, { path: '/' });

  const logout = async () => {
    try {
      setLoading(true)
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAeW9wbWFpbC5jb20iLCJfaWQiOiI2NWE3OWM0OTg3YjUwZTI4MjhjYmVhYWQiLCJyb2xlIjoidXNlciIsImlhdCI6MTcwOTAxNjM3MywiZXhwIjoxNzExNjA4MzczfQ.kuJEQqHPLARdCtHU9HA7UYFZJhG2qjfpbA1nDLY88YE'

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios.post(process.env.NEXT_PUBLIC_API_HOST + '/logout')
      const data = await response.data;
      if (data?.success == true) {
        cookies.remove('JWTtoken');
        setUser(null)
        setLoading(false)
        toast.success(data?.message)
        router.push("/login")
      } else {
        toast.error(data?.message)
      }
    } catch (error) {
      toast.warning(error?.message)
    }
  }
  return (
    <div className='z-50 rounded-xl bg-[#2e2e2eab] flex justify-between py-3 pr-3 md:pr-8 pl-3 sticky top-0 items-center shadow-b-sm shadow-green-100'>
      <div className='flex items-center gap-4'>
        <Link href="/">
          <Image
            src="/logo.png"
            width={30}
            height={30}
            alt="Website logo"
            className='rounded-lg'
          />
        </Link>
        <Image
          src="/in_flag.png"
          width={15}
          height={15}
          alt="Indian Flag logo"
          className='rounded-xl hidden md:block'
        />
      </div>
      <div className='flex gap-4 item-center'>
        {
          user ?
            <>
              <div className='flex items-center gap-4'>
                <Link href="/user/profile">
                  <Image
                    src="/defaultprofile.jpg"
                    width={30}
                    height={30}
                    alt="Website logo"
                    className='rounded-full'
                  />
                </Link>
                <Link href="/user/deposite"><button className='bg-[#ffa900] text-sm px-4 py-2 rounded-lg text-white flex gap-4 items-center'><FaMoneyCheckDollar className='hidden md:block' /> ₹14000000 DEPOSITE</button></Link>
                <button onClick={logout} className='bg-[#05ad05] text-xs px-4 py-2 rounded-lg text-white hidden md:block' disabled={loading}>{loading ? "Loading..." : "Logout"}</button>
              </div>
            </>
            :
            <>
              <Link href="/login"><div className='bg-[#4d4d4d] text-xs px-4 py-2 rounded-lg text-white'>Login</div></Link>
              <Link href="/register"><div className='bg-[#05ad05] text-xs px-4 py-2 rounded-lg text-white'>Complete Registration</div></Link>
            </>
        }
      </div>
    </div>
  )
}

export default Header