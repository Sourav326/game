"use client"
import React, { useEffect, useState } from 'react'

const page = () => {
    
    const [number,setNumber] = useState(0);
    const [isWaiting,setIsWaiting] = useState(true);
    function updateNumber() {
        const newNumber = Math.floor(Math.random() * 10)
        setNumber(newNumber);
        setIsWaiting(false)
      }
      useEffect(() => {
        setInterval(updateNumber,20000)
      },[number])

    return (
        <div className='flex flex-col justify-center items-center py-10 gap-20'>
            <div className='flex'>
                <div className='rounded-xl bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% px-32 text-white font-bold'>
                    {
                        isWaiting? <div className='text-[5rem]'>Waiting for number</div>: 
                        <div className='text-[15rem]'>{number}</div>
                    }

                </div>
            </div>
            <div>
                <div className='flex gap-4'>
                    <div className='rounded-lg bg-green-500 p-5 text-white font-bold'>
                        1
                    </div>
                    <div className='rounded-lg bg-blue-500 p-5 text-white font-bold'>
                        2
                    </div>
                    <div className='rounded-lg bg-yellow-500 p-5 text-white font-bold'>
                        3
                    </div>
                    <div className='rounded-lg bg-red-500 p-5 text-white font-bold'>
                        4
                    </div>
                    <div className='rounded-lg bg-lime-400 p-5 text-white font-bold'>
                        5
                    </div>
                    <div className='rounded-lg bg-fuchsia-600 p-5 text-white font-bold'>
                        6
                    </div>
                    <div className='rounded-lg bg-teal-400 p-5 text-white font-bold'>
                        7
                    </div>
                    <div className='rounded-lg bg-orange-500 p-5 text-white font-bold'>
                        8
                    </div>
                </div>
                <div className='flex gap-2 pt-6 justify-center'>
                    <input name="amount" className='p-3 rounded-lg' placeholder='₹ Enter your amount' />
                    <button className='bg-sky-500 text-white py-3 px-8 rounded-lg'>Bet</button>
                </div>
            </div>

            <div className="cursor-pointer group perspective">
                <div className="relative preserve-3d group-hover:my-rotate-y-180 w-full h-full duration-1000">
                    <div className="absolute backface-hidden w-full h-full">
                        erdsfcerfdcfv rf
                    </div>
                    <div className="absolute my-rotate-y-180 backface-hidden w-full h-full overflow-hidden" >
                        AAAAAAAAAAAAAA
                    </div>
                </div>
            </div>
        </div>



    )
}

export default page