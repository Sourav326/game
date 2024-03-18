"use client"
import React, { useEffect, useState } from 'react'
import axios from "axios"
import { toast } from "sonner";
import ProfileShimmer from '@/components/shimmers/profileShimmer';
import { jwtDecode } from "jwt-decode";
import Link from 'next/link';
import Image from 'next/image'

const Page = () => {

    const [user, setUser] = useState('')
    const getUser = async () => {
        try {
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAeW9wbWFpbC5jb20iLCJfaWQiOiI2NWE3OWM0OTg3YjUwZTI4MjhjYmVhYWQiLCJyb2xlIjoidXNlciIsImlhdCI6MTcwOTAxNjM3MywiZXhwIjoxNzExNjA4MzczfQ.kuJEQqHPLARdCtHU9HA7UYFZJhG2qjfpbA1nDLY88YE'


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
        <>
            <div className="grid md:grid-cols-2 gap-4 py-4">
                <div className="rounded-xl bg-[#2e2e2eab] flex flex-col gap-5 p-3 text-white">
                    <div className="bg-white p-3 border-t-4 border-green-400 w-full rounded-xl">
                        <div className="image overflow-hidden">
                            <Image
                                src={user.image == "" ? '/defaultprofile.jpg' : user.image}
                                width={100}
                                height={100}
                                alt="profile"
                                className="h-auto w-[100px] rounded-full mx-auto"
                            />
                        </div>
                        <h1 className="text-gray-900 font-bold text-xl leading-8 my-1 capitalize">{user.name}</h1>
                        <h3 className="text-gray-600 font-lg text-semibold leading-6">{user.email}</h3>
                        <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">{user.phone}</p>
                        <ul
                            className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                            <li className="flex items-center py-3">
                                <span>Wallet</span>
                                <span className="ml-auto"><span
                                    className="bg-green-500 py-1 px-2 rounded text-white text-sm">₹ {user.wallet ? user.wallet : 0}</span></span>
                            </li>
                            <li className="flex items-center py-3">
                                <span>Member since</span>
                                <span className="ml-auto">{new Date(user.createdAt).toDateString()}</span>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-white p-3 border-t-4 border-green-400 w-full rounded-xl flex justify-center gap-7">
                        <Link href="/user/deposite">
                            <button class="bg-[#05ad05] text-sm px-4 py-2 rounded-lg text-white flex gap-4 items-center">DEPOSITE</button>
                        </Link>
                        <Link href="/user/withdraw">
                            <button class="bg-[#ffa900] text-sm px-4 py-2 rounded-lg text-white flex gap-4 items-center">WITHDRAW</button>
                        </Link>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Page