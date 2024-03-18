'use client'

import Link from "next/link"
import { useState } from "react"
import axios from "axios"
import { useRouter } from 'next/navigation'
import { toast } from "sonner";

const page = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [password, setPassword] = useState('')
    const [isNameError, setIsNameError] = useState(false)
    const [isEmailError, setIsEmailError] = useState(false)
    const [isMobileError, setIsMobileError] = useState(false)
    const [isPasswordError, setIsPasswordError] = useState(false)

    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const hanleNameChange = (e) => {
        setName(e.target.value)
        if (e.target.value == "") {
            setIsNameError(true)
        } else {
            setIsNameError(false)
        }
    }
    const hanleEmailChange = (e) => {
        setEmail(e.target.value)
        if (e.target.value == "") {
            setIsEmailError(true)
        } else {
            setIsEmailError(false)
        }
    }
    const hanleMobileChange = (e) => {
        setMobile(e.target.value)
        if (e.target.value == "") {
            setIsMobileError(true)
        } else {
            setIsMobileError(false)
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

        if (name === "" || !name) {
            setIsNameError(true);
            return false;
        }
        if (email === "" || !email) {
            setIsEmailError(true);
            return false;
        }
        if (mobile === "" || !mobile) {
            setIsMobileError(true);
            return false;
        }
        if (password === "" || !password) {
            setIsPasswordError(true)
            return false;
        }
        setLoading(true)
        try {
            let response = await axios.post(process.env.NEXT_PUBLIC_API_HOST + '/signup', {
                name: name,
                email: email,
                password: password,
                phone: mobile
            });
            const data = await response.data;
            if (data.success == true) {
                toast.success(data.message)
                router.push("/login")
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error)
        }
    }
    return (
        <>
            <Link href="/" className="shadow-lg w-42 shadow-indigo-500/40 rounded-md bg-green-500 text-white px-8 py-3 absolute top-20 left-20" >Go To Home</Link>

            <div className="flex items-center justify-center h-screen">
                <div className="w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <form className="space-y-6">
                        <h5 className="text-xl font-medium text-gray-900 dark:text-white">Register to our platform</h5>
                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                            <input type="text" name="name" id="name" value={name} onChange={hanleNameChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter Name" required />
                            <span className="text-red-500 text-sm">{isNameError ? "Name is required" : ""}</span>
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
                            <input type="email" name="email" id="email" value={email} onChange={hanleEmailChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter Email" required />
                            <span className="text-red-500 text-sm">{isEmailError ? "Email is required" : ""}</span>
                        </div>
                        <div>
                            <label htmlFor="mobile" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Mobile No.</label>
                            <input type="text" name="mobile" id="mobile" value={mobile} onChange={hanleMobileChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter Email" required />
                            <span className="text-red-500 text-sm">{isMobileError ? "Mobile is required" : ""}</span>
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Password</label>
                            <input type="password" name="password" id="password" value={password} onChange={hanlePasswordChange} placeholder="Enter Password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                            <span className="text-red-500 text-sm">{isPasswordError ? "Password is required" : ""}</span>
                        </div>
                        <div className="flex items-start">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                                </div>
                                <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                            </div>
                        </div>
                        <button onClick={handleSubmit} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" disabled={loading}>{loading ? "Loading..." : "Create your account"}</button>
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                            Already have a account? <Link href="/login" className="text-blue-700 hover:underline dark:text-blue-500">Login account</Link>
                        </div>
                    </form>
                </div>
            </div>
        </>

    )
}

export default page