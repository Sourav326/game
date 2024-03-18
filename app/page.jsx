"use client"

import { images } from '@/utils/banner'
import BannerCarausal from '@/components/BannerCarausal';
import FrontCard from '@/components/FrontCard';
import GameList from '@/components/game/GameList';


import MainLayout from '@/components/MainLayout'

export default function Home() {
  
  return (
    <div className='bg-[#090f1e] p-4'>
    <MainLayout>
      <div className="grid grid-cols-1 md:grid-cols-11 gap-4 h-36 md:h-96">
        <div className='col-span-7 h-full'>
          <BannerCarausal images={images} slideToShow="1" />
        </div>
        <div className='col-span-2 hidden md:block'>
          <img
            className="w-full h-full rounded-2xl"
            src="/bonus-banner-cashback-casino.avif"
            alt='/bonus-banner-cashback-casino.avif'
          />
        </div>
        <div className='col-span-2 hidden md:block'>
          <img
            className="w-full h-full rounded-2xl"
            src="/bonus-banner-deposit.avif"
            alt='/bonus-banner-deposit.avif'
          />
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4 py-4'>
          <FrontCard />
          <FrontCard />
          <FrontCard />
          <FrontCard />
      </div>
      <GameList />
      </MainLayout>
    </div>
  )
}
