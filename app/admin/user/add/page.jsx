'use client'

import { useState } from "react"
import axios from "axios"
import { toast } from "sonner";
import { useRouter } from 'next/navigation'

const page = () => {
      const [name, setName] = useState('')
      const [email, setEmail] = useState('')
      const [mobile, setMobile] = useState('')
      const [password, setPassword] = useState('')
      const [role, setRole] = useState('')
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
      const hanleRoleChange = (e) => {
            setRole(e.target.value)
      }

      const handleSubmit = async (e) => {
            e.preventDefault()
            if (name === "" || !name) {
                  setIsNameError(true);
                  return false;
            }
            if (email === "" || !email) {
                  setIsEmailError(true)
                  return false;
            }
            if (mobile === "" || !mobile) {
                  setIsMobileError(true)
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
                        phone: mobile,
                        password: password,
                        role: role
                  });
                  const data = await response.data;

                  if (data?.success == true) {
                        toast.success(data.message)
                        setName('')
                        setEmail('')
                        setMobile('')
                        setPassword('')
                        setLoading(false)
                  } else {
                        toast.error(data.message)
                  }
            } catch (error) {
                  toast.error(error)
            }
      }

      return (
            <div className='shadow-lg shadow-indigo-500/40 rounded-md bg-white p-5 w-full max-w-3xl'>
                  <form className="space-y-6">
                        <h5 className="text-xl font-medium text-gray-900 dark:text-white">Add User Details</h5>
                        <div>
                              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                              <input type="text" value={name} onChange={hanleNameChange} name="name" id="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder="Enter name" />
                              <span className="text-red-500 text-sm">{isNameError ? "Name is required" : ""}</span>

                        </div>
                        <div>
                              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                              <input type="email" value={email} onChange={hanleEmailChange} name="email" id="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder="Enter email" />
                              <span className="text-red-500 text-sm">{isEmailError ? "Email is  required" : ""}</span>
                        </div>
                        <div>
                              <label htmlFor="mobile" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mobile</label>
                              <input type="number" value={mobile} onChange={hanleMobileChange} name="mobile" id="mobile" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder="Enter mobile" />
                              <span className="text-red-500 text-sm">{isMobileError ? "Mobile is  required" : ""}</span>
                        </div>
                        <div>
                              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                              <input type="password" value={password} onChange={hanlePasswordChange} name="password" id="password" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder="Enter password" />
                              <span className="text-red-500 text-sm">{isPasswordError ? "Password is required" : ""}</span>
                        </div>
                        <div>

                              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
                              <div className="relative w-full">
                                    <select onChange={hanleRoleChange} name="role" className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10 w-full">
                                          <option value="user">User</option>
                                          <option value="admin">Admin</option>
                                    </select>
                                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4" viewBox="0 0 24 24">
                                                <path d="M6 9l6 6 6-6"></path>
                                          </svg>
                                    </span>
                              </div>
                        </div>
                        <button onClick={handleSubmit} className="max-w-xs w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" disabled={loading}>{loading ? "Loading..." : "Add User"}</button>
                  </form>
            </div>
      )
}

export default page