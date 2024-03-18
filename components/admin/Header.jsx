import { FaBarsStaggered } from "react-icons/fa6";
import { MdOutlineZoomInMap } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import Image from 'next/image'
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ImProfile } from "react-icons/im";
import { AiFillSetting } from "react-icons/ai";
import Cookies from 'universal-cookie';
import { useRouter } from 'next/navigation'
import { toast } from "sonner";
import axios from "axios"
import { jwtDecode } from "jwt-decode";

const Header = ({ onIsCollapsed, user, setUser }) => {
    const [dropdown, setDropdown] = useState(false)
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const cookies = new Cookies(null, { path: '/' });
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAeW9wbWFpbC5jb20iLCJfaWQiOiI2NWE3OWM0OTg3YjUwZTI4MjhjYmVhYWQiLCJyb2xlIjoidXNlciIsImlhdCI6MTcwOTAxNjM3MywiZXhwIjoxNzExNjA4MzczfQ.kuJEQqHPLARdCtHU9HA7UYFZJhG2qjfpbA1nDLY88YE'

    const [loginUser, setLoginuser] = useState('')

    useEffect(() => {
        if (token) {
            const userData = jwtDecode(token)
            if (userData) {
                setLoginuser(userData)
            }
        }
    }, [token])

    const logout = async () => {
        try {
            setLoading(true)
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            const response = await axios.post(process.env.NEXT_PUBLIC_API_HOST + '/logout')
            const data = await response.data;
            if (data?.success == true) {
                cookies.remove('JWTtoken');
                setUser(null)
                setLoading(false)
                toast.success(data?.message)
                router.push("/login")
            } else {
                toast.error(data?.message)
            }
        } catch (error) {
            toast.warning(error?.message)
        }
    }


    const handleClick = () => {
        onIsCollapsed((prev) => !prev)
    }
    const showDropdown = () => {
        setDropdown(true)
    }
    const hideDropdown = () => {
        setDropdown(false)
    }
    const pathname = usePathname()
    return (
        <div className='bg-white flex justify-between py-3 pr-8 pl-3 sticky top-0 z-20 items-center shadow-b-sm shadow-green-100'>
            <div className="flex gap-4">
                <div className='hover:bg-gray-900 p-3 hover:text-white rounded cursor-pointer peer' onClick={handleClick}>
                    <FaBarsStaggered />
                </div>
                <input type="search" name="search" placeholder="Search..." className="w-80 focus:outline-none px-4" />
            </div>
            <div className="flex gap-4 items-center relative">
                <div className="flex gap-2" onMouseEnter={showDropdown} onMouseLeave={hideDropdown}>
                    {
                        dropdown && (
                            <div id="dropdownAvatarName" className=" top-7 left-0 absolute z-10 bg-white divide-y divide-gray-100 rounded-lg  w-44 dark:bg-gray-700 dark:divide-gray-600">
                                <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                    <div className="font-medium ">Admin</div>
                                    <div className="truncate">{loginUser.email}</div>
                                </div>
                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton">
                                    <li className={` ${pathname == '/admin/profile' ? 'bg-violet-700' : ''} hover:bg-violet-200`}>
                                        <Link href="/admin/profile" className={` ${pathname == '/admin/profile' ? 'text-white' : ''} block px-4 py-2 dark:hover:bg-gray-600 dark:hover:text-white flex gap-2 items-center`}><ImProfile /> Profile</Link>
                                    </li>
                                    <li className={` ${pathname == '/admin/setting' ? 'bg-violet-700' : ''} hover:bg-violet-200`}>
                                        <Link href="/admin/setting" className={` ${pathname == '/admin/setting' ? 'text-white' : ''} block px-4 py-2 dark:hover:bg-gray-600 dark:hover:text-white flex gap-2 items-center`}><AiFillSetting /> Settings</Link>
                                    </li>
                                </ul>
                                <div className="py-2 ">
                                    <div onClick={logout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-violet-200 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer" disabled={loading}>{loading ? "Loading..." : "Sign out"}</div>
                                </div>
                            </div>
                        )
                    }
                    <Image
                        src="/logo.png"
                        width={30}
                        height={30}
                        alt="Website logo"
                        className='logo rounded-full cursor-pointer'

                    />
                    <div className="flex items-center gap-2 cursor-pointer">
                        <h2 className="text-sm text-slate-600">Hi Admin</h2>
                        <IoIosArrowDown />
                    </div>
                </div>

                <div title="Zoom" className="cursor-pointer pl-12 hover:text-slate-950 hover:text-lg"><MdOutlineZoomInMap /></div>
            </div>
        </div>
    )
}

export default Header