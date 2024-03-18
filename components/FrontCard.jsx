import Image from 'next/image'

const FrontCard = () => {
  return (
    <div className='rounded-xl bg-[#2e2e2eab] flex justify-between p-3 text-white'>
        <div>
            <h1 className='text-2xl font-semibold'>TVBET</h1>
            <span className='text-sm'>Live Game 24/7</span>
        </div>
        <Image
            src="/logo.png"
            width={60}
            height={60}
            alt="Website logo"
            className='rounded-lg'
        />
    </div>
  )
}

export default FrontCard