"use client"
import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useState } from 'react'
import axios from "axios"
import { toast } from "sonner";
import ProfileShimmer from '@/components/shimmers/profileShimmer';
const page = () => {

    const [user, setUser] = useState('')
    const getUser = async () => {
        try {
            const token = localStorage.getItem("JWTtoken")
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            const response = await axios.get(process.env.NEXT_PUBLIC_API_HOST + '/user/profile')
            const data = await response.data;
            if (data?.success == true) {
                setUser(data.data)
            } else {
                toast.error(data?.message)
            }
        } catch (error) {
            toast.warning(error?.message)
        }
    }

    useEffect(() => {
        getUser();
    }, []);
    return user.length == 0 ? (
        <ProfileShimmer />
    ) : (
            <div className="grid grid-cols-5 gap-12">
                <div className="col-span-2 gap-8 shadow-lg shadow-indigo-500/40 p-12 flex flex-col justify-center items-center bg-gradient-to-r from-purple-500 to-pink-300 text-white rounded">
                    <Image
                        src="/logo.png"
                        width={200}
                        height={200}
                        alt="Website logo"
                        className='logo rounded-full cursor-pointer'
                        
                    />
                    <div className="text-center">
                        <h1 className="text-2xl">{user.name}</h1>
                        <h2 className="">{user.email}</h2>
                    </div>
                </div>
                <div className="col-span-3 gap-8 shadow-lg shadow-indigo-500/40 p-12 rounded bg-white">
                    <form className="space-y-6" action="#">
                        <h5 className="text-xl font-medium text-gray-900 dark:text-white">Profile Details</h5>
                        <div>
                            <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                            <input type="text" name="name" id="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" value={user.name} required />
                        </div>
                        <div>
                            <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
                            <input type="email" name="email" id="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" value={user.email + " (Email Can't be changed)"} disabled />
                        </div>
                        <div>
                            <label for="mobile" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Mobile</label>
                            <input type="text" name="mobile" id="mobile" placeholder="Enter Mobile" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" value={user.phone} required />
                        </div>
                        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update your account</button>
                    </form>
                    <div className="text-center py-6 text-blue-700 hover:underline dark:text-blue-500"><Link href="/change-password">Want to Change Password ?</Link></div>
                </div>
            </div>
    )
  }
  
  export default page