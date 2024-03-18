import React from 'react';
import { UpdateNumberComponent, AllUserList } from '@/app/socket';


const Page = () => {
    return (
        <div>
            <div className="grid md:grid-cols-7 gap-3 px-2">
                <div className="px-3 border rounded-xl md:col-span-2 order-last md:order-first bg-[#2e2e2eab]">
                    <AllUserList />
                </div>
                <div className="md:col-span-5 flex flex-col gap-3">
                    <UpdateNumberComponent />
                </div>
            </div>
        </div>
    )
}

export default Page
