
"use client"
import React, { useEffect, useState } from 'react'
import axios from "axios"
import { toast } from "sonner";
import ProfileShimmer from '@/components/shimmers/profileShimmer';

const Page = ({ params }) => {
      const id = params.id
      const [name, setName] = useState('')
      const [email, setEmail] = useState('')
      const [phone, setPhone] = useState('')
      const [wallet, setWallet] = useState('')
      const [s_promocode, setSPromocode] = useState('')
      const [promocode, setPromocode] = useState('')
      const [comment, setComment] = useState('')
      const [isNameError, setIsNameError] = useState(false)
      const [isPhoneError, setIsPhoneError] = useState(false)
      const [loading, setLoading] = useState(false)
      const [user, setUser] = useState('')
      useEffect(() => {
            const getUser = async () => {
                  try {
                        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAeW9wbWFpbC5jb20iLCJfaWQiOiI2NWE3OWM0OTg3YjUwZTI4MjhjYmVhYWQiLCJyb2xlIjoidXNlciIsImlhdCI6MTcwOTAxNjM3MywiZXhwIjoxNzExNjA4MzczfQ.kuJEQqHPLARdCtHU9HA7UYFZJhG2qjfpbA1nDLY88YE'

                        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                        const response = await axios.get(process.env.NEXT_PUBLIC_API_HOST + '/user/single/' + id)
                        const data = await response.data;
                        if (data?.success == true) {
                              setUser(data.data)
                              setName(data.data.name)
                              setEmail(data.data.email)
                              setPhone(data.data.phone)
                              setWallet(data.data.wallet)
                              setSPromocode(data.data.s_promocode)
                              setPromocode(data.data.promocode)
                              setComment(data.data.comment)
                        } else {
                              toast.error(data?.message)
                        }
                  } catch (error) {
                        toast.warning(error?.message)
                  }
            }

            getUser();
      }, [id]);


      const handleNameChange = (e) => {
            setName(e.target.value)
            if (e.target.value == "") {
                  setIsNameError(true)
            } else {
                  setIsNameError(false)
            }
      }


      const handlePhoneChange = (e) => {
            setPhone(e.target.value)
            if (e.target.value == "") {
                  setIsPhoneError(true)
            } else {
                  setIsPhoneError(false)
            }
      }

      const handleSubmit = async (e) => {
            e.preventDefault()
            if (name === "" || !name) {
                  setIsNameError(true);
                  return false;
            }
            if (phone === "" || !phone) {
                  setIsPhoneError(true)
                  return false;
            }
            setLoading(true)
            try {
                  const response = await axios.post(process.env.NEXT_PUBLIC_API_HOST + '/user/update/' + id, {
                        name: name,
                        phone: phone,
                        email: email,
                        phone: phone,
                        s_promocode: s_promocode,
                        promocode: promocode,
                        comment: comment,
                  });
                  const data = await response.data;

                  if (data?.success == true) {
                        toast.success(data.message)
                        setLoading(false)
                  } else {
                        toast.error(data.message)
                  }
            } catch (error) {
                  toast.error(error)
            }
      }

      return user.length == 0 ? (
            <ProfileShimmer />
      ) : (

            <div className='shadow-lg shadow-indigo-500/40 rounded-md bg-white p-5 w-full max-w-6xl'>
                  <form className="space-y-6">
                        <h5 className="text-xl font-medium text-gray-900 dark:text-white">Edit User Details</h5>
                        <div className='grid grid-cols-3 gap-8'>
                              <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                    <input type="text" onChange={handleNameChange} value={name} name="name" id="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder="Enter name" />
                                    <span className="text-red-500 text-sm">{isNameError ? "Name required" : ""}</span>
                              </div>
                              <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                    <input type="email" value={email} name="email" id="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder="Enter email" disabled />
                              </div>
                              <div>
                                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                                    <input type="number" onChange={handlePhoneChange} value={phone} name="phone" id="phone" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder="Enter phone" />
                                    <span className="text-red-500 text-sm">{isPhoneError ? "Phone required" : ""}</span>
                              </div>
                        </div>
                        <div className='grid grid-cols-3 gap-8'>
                              <div>
                                    <label htmlFor="wallet" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Wallet</label>
                                    <input type="number" onChange={(e) => e.target.value} value={wallet} name="wallet" id="phone" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder="Enter Wallet amount" />
                              </div>
                              <div>
                                    <label htmlFor="s_promocode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">S Promocode</label>
                                    <input type="text" value={s_promocode} name="s_promocode" id="s_promocode" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder="Enter S Promocode" />
                              </div>
                              <div>
                                    <label htmlFor="promocode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Promocode</label>
                                    <input type="text" value={promocode} name="promocode" id="promocode" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder="Enter Promocode" />
                              </div>
                        </div>
                        <div>
                              <label htmlFor="comment" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Comment</label>
                              <textarea id="comment" name="comment" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out">{comment}</textarea>
                        </div>

                        <button onClick={handleSubmit} type="submit" className="max-w-xs w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" disabled={loading}>{loading ? "Loading..." : "Update User"}</button>
                  </form>
            </div>
      )
}

export default Page