'use client'

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

const NotFound = () => {
    const router = useRouter()
   
  return (
        <>
        <div className="flex gap-4 flex-col justify-center items-center h-screen">
            <Image
                src="/404.gif"
                width={600}
                height={600}
                alt="Website logo"
                className='logo rounded-full cursor-pointer'
            />
            <div className="flex flex-col items-center gap-4">
                <h1 className="text-4xl font-bold">Oops! You hit a dead end.</h1>
                <h2 className="text-lg font-light">The Page has either been deleted or moved.</h2>
                <button onClick={router.back} className="shadow-lg w-32 shadow-indigo-500/40 rounded-md bg-red-400 text-white px-8 py-3" >Go Back</button>
            </div>
        </div>
        </>
  )
}

export default NotFound