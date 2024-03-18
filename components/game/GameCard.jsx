"use client"

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Cookies from 'universal-cookie';

const GameCard = ({link = '#',image='/aviator.png'}) => {
    const [isLogin, setisLogin] = useState(false)

    const getCookie = () => {
        const cookies = new Cookies(null, { path: '/' });
        const token = cookies.get('JWTtoken')
        if (token) {
            setisLogin(true)
        }
    }

    useEffect(() => {
        getCookie()
    },[isLogin])

    return (
        <div className="">
            <img src={image} className='w-full h-36 md:h-80 rounded-t-lg' />
            <div className='w-full text-center'>
                <div className='md:px-5 py-5 bg-lime-500 text-center text-white rounded-b-lg text-lg font-lightbold'>
                    {
                        isLogin?
                        <Link href={link} className='px-5 py-2 rounded-2xl bg-green-800 hover:bg-orange-400' >Play Now</Link>
                        :
                        <Link href="login" className='px-5 py-2 rounded-2xl bg-amber-500 hover:bg-orange-400' >Login</Link>
                    }
                </div>
            </div>
        </div>
    )
}

export default GameCard