import React from 'react'
import GameCard from './GameCard'

const GameList = () => {
  return (
    <div className='px-4 pt-8 bg-[#2e2e2eab] rounded-xl'>
        <h1 className='text-center text-white font-bold text-3xl py-4 '>Our Popular Games</h1>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 py-6'>
          <GameCard image="/aviator.png" link="user/crash" />
          <GameCard image="/numbergame.png" link="user/lotto-win" />
          <GameCard />
          <GameCard />
          <GameCard />
          <GameCard />
          <GameCard />
        </div>

    </div>
  )
}

export default GameList