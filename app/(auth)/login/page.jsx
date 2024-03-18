"use client"

import Link from "next/link"
import { useState } from "react"
import axios from "axios"
import { useRouter } from 'next/navigation'
import { toast } from "sonner";
import Cookies from 'universal-cookie';



const Page = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [isEmailError, setIsEmailError] = useState(false)
    const [isPasswordError, setIsPasswordError] = useState(false)
    const router = useRouter()
    const cookies = new Cookies(null, { path: '/' });


    const hanleUsernameChange = (e) => {
        setUsername(e.target.value)
        if (e.target.value == "") {
            setIsEmailError(true)
        } else {
            setIsEmailError(false)
        }
    }
    const hanlePasswordChange = (e) => {
        setPassword(e.target.value)
        if (e.target.value == "") {
            setIsPasswordError(true)
        } else {
            setIsPasswordError(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (username === "" || !username) {
            setIsEmailError(true);
            return false;
        }
        if (password === "" || !password) {
            setIsPasswordError(true)
            return false;
        }
        setLoading(true)
        try {
            const response = await axios.post(process.env.NEXT_PUBLIC_API_HOST + '/login', {
                email: username,
                password: password
            });
            const data = response?.data
            if (data?.success === true) {
                const token = data?.token
                localStorage.setItem(
                    `JWTtoken`,
                    token
                );
                cookies.set('JWTtoken', token);
                const base64Url = token.split('.')[1];
                const base64 = base64Url.replace('-', '+').replace('_', '/');
                const user = JSON.parse(window.atob(base64));
                toast.success(data?.message)
                if (user.role == "admin") {
                    router.push("/admin")
                } else {
                    router.push("/user")
                }
            } else {
                toast.error(data?.message)
                setLoading(false);
            }
        } catch (error) {
            toast.warning(error?.message)
            setLoading(false);
        }
    }
    return (
        <>
            <Link href="/" className="shadow-lg w-42 shadow-indigo-500/40 rounded-md bg-green-500 text-white px-8 py-3 absolute top-20 left-20" >Go To Home</Link>
            <div className="flex items-center justify-center h-screen">
                <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <form className="space-y-6">
                        <h5 className="text-xl font-medium text-gray-900 dark:text-white">Login to our platform</h5>
                        <div>
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email / Mobile</label>
                            <input value={username} onChange={hanleUsernameChange} type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter Email / Mobile" required />
                            <span className="text-red-500 text-sm">{isEmailError ? "Email / Mobile required" : ""}</span>
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Password</label>
                            <input value={password} onChange={hanlePasswordChange} type="password" name="password" id="password" placeholder="Enter Password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                            <span className="text-red-500 text-sm">{isPasswordError ? "Password required" : ""}</span>
                        </div>
                        <div className="flex items-start">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
                                </div>
                                <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                            </div>
                            <Link href="/lost-password" className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</Link>
                        </div>
                        <button onClick={handleSubmit} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" disabled={loading}>{loading ? "Loading..." : "Login to your account"}</button>
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                            Not registered? <Link href="register" className="text-blue-700 hover:underline dark:text-blue-500">Create account</Link>
                        </div>
                    </form>
                </div>
            </div>
        </>

    )
}

export default Page