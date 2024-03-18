'use client'

import Image from 'next/image'
import { IoHome } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import { GiTatteredBanner } from "react-icons/gi";
import { FaBaseballBatBall } from "react-icons/fa6";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { BiMoneyWithdraw } from "react-icons/bi";
import { FaMountainCity } from "react-icons/fa6";
import { BsBank2 } from "react-icons/bs";
import { TbBuildingWindTurbine } from "react-icons/tb";
import { useRouter } from 'next/navigation'

const Sidebar = ({isCollapsed}) => {
    const pathname = usePathname()
  return (
            <div className='sidebarMain absolute md:relative bg-white h-screen md:sticky top-0 px-5 py-3 peer-focus:left-0 peer:transition ease-out delay-150 duration-200 dark:bg-gray-800 dark:text-white shrink-0' data-collapse={isCollapsed}>
                <Link href="/admin">
                    <div className='logoContent flex items-center gap-4'>
                        <Image
                            src="/logo.png"
                            width={40}
                            height={40}
                            alt="Website logo"
                            className='logo'
                        />
                        <div className='logoText font-semibold text-red-800 text-3xl italic font-mono'>Aviator</div>
                    </div>
                </Link>
                <ul className='px-4 py-8 text-sm sidebar'>
                <div className='flex pb-8 gap-4'>
                    <Image
                        src="/logo.png"
                        width={40}
                        height={40}
                        alt="Website logo"
                        className='logo rounded-full'
                    />
                    <div className='profile-details'>
                        <h2 className='font-bold'>Admin</h2>
                        <h2 className='font-medium text-slate-400 text-xs'>Administrator</h2>
                    </div>
                </div>
                    <li title="Dashboard" className={` ${pathname == '/admin' ? 'bg-violet-700' : ''} p-3 mb-2 hover:bg-violet-200 rounded-md group cursor-pointer hover:shadow-lg`}><Link href="/admin" className={` ${pathname == '/admin' ? 'text-white' : ''}  flex justify-between items-end`}><div className='sidebarName'>Dashboard</div><IoHome className='sidebarIcon' /></Link></li>
                    <li title="User Management" className={` ${pathname.startsWith('/admin/user') ? 'bg-violet-700' : ''} p-3 mb-2 hover:bg-violet-200 rounded-md group cursor-pointer hover:shadow-lg`}><Link href="/admin/user" className={` ${pathname.startsWith('/admin/user') ? 'text-white' : ''}  flex justify-between items-end`}><div className='sidebarName'>User Management</div><FaUserFriends className='sidebarIcon' /></Link></li>
                    <li title="Banner Management" className={` ${pathname.startsWith('/admin/banner') ? 'bg-violet-700' : ''} p-3 mb-2 hover:bg-violet-200 rounded-md group cursor-pointer hover:shadow-lg`}><Link href="/admin/banner" className={` ${pathname.startsWith('/admin/banner') ? 'text-white' : ''}  flex justify-between items-end`}><div className='sidebarName'>Banner Management</div><GiTatteredBanner className='sidebarIcon' /></Link></li>
                    <li title="Betting Management" className={` ${pathname.startsWith('/admin/betting') ? 'bg-violet-700' : ''} p-3 mb-2 hover:bg-violet-200 rounded-md group cursor-pointer hover:shadow-lg`}><Link href="/admin/betting" className={` ${pathname.startsWith('/admin/betting') ? 'text-white' : ''}  flex justify-between items-end`}><div className='sidebarName'>Betting Management</div><FaBaseballBatBall className='sidebarIcon' /></Link></li>
                    <li title="Recharge Management" className={` ${pathname.startsWith('/admin/recharge') ? 'bg-violet-700' : ''} p-3 mb-2 hover:bg-violet-200 rounded-md group cursor-pointer hover:shadow-lg`}><Link href="/admin/recharge" className={` ${pathname.startsWith('/admin/recharge') ? 'text-white' : ''}  flex justify-between items-end`}><div className='sidebarName'>Recharge Management</div><FaMoneyCheckDollar className='sidebarIcon' /></Link></li>
                    <li title="Withdraw Management" className={` ${pathname.startsWith('/admin/withdraw') ? 'bg-violet-700' : ''} p-3 mb-2 hover:bg-violet-200 rounded-md group cursor-pointer hover:shadow-lg`}><Link href="/admin/withdraw" className={` ${pathname.startsWith('/admin/withdraw') ? 'text-white' : ''}  flex justify-between items-end`}><div className='sidebarName'>Withdraw Management</div><BiMoneyWithdraw className='sidebarIcon' /></Link></li>
                    <li title="Amount Setup" className={` ${pathname .startsWith('/admin/amount') ? 'bg-violet-700' : ''} p-3 mb-2 hover:bg-violet-200 rounded-md group cursor-pointer hover:shadow-lg`}><Link href="/admin/amount" className={` ${pathname .startsWith('/admin/amount') ? 'text-white' : ''}  flex justify-between items-end`}><div className='sidebarName'>Amount Setup</div><FaMountainCity className='sidebarIcon' /></Link></li>
                    <li title="Bank Details" className={` ${pathname.startsWith('/admin/bank-details') ? 'bg-violet-700' : ''} p-3 mb-2 hover:bg-violet-200 rounded-md group cursor-pointer hover:shadow-lg`}><Link href="/admin/bank-details" className={` ${pathname.startsWith('/admin/bank-details')? 'text-white' : ''}  flex justify-between items-end`}><div className='sidebarName'>Bank Details</div><BsBank2 className='sidebarIcon' /></Link></li>
                    <li title="Winning Management" className={` ${pathname.startsWith('/admin/winning') ? 'bg-violet-700' : ''} p-3 mb-2 hover:bg-violet-200 rounded-md group cursor-pointer hover:shadow-lg`}><Link href="/admin/winning" className={` ${pathname.startsWith('/admin/winning') ? 'text-white' : ''}  flex justify-between items-end`}><div className='sidebarName'>Winning Management</div><TbBuildingWindTurbine className='sidebarIcon' /></Link></li>
                    <li title="Game Management" className={` ${pathname.startsWith('/admin/game') ? 'bg-violet-700' : ''} p-3 mb-2 hover:bg-violet-200 rounded-md group cursor-pointer hover:shadow-lg`}><Link href="/admin/game" className={` ${pathname.startsWith('/admin/game') ? 'text-white' : ''}  flex justify-between items-end`}><div className='sidebarName'>Winning Management</div><TbBuildingWindTurbine className='sidebarIcon' /></Link></li>
                </ul>
            </div>
  )
}

export default Sidebar