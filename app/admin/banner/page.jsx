"use client"

import Link from "next/link"
import React, { useEffect, useState } from 'react'
import axios from "axios"
import { toast } from "sonner";
import TableShimmer from "@/components/shimmers/tableShimmer";
import { FaEdit } from "react-icons/fa";
import DeleteBanner from "@/components/admin/banner/DeleteBanner";
import Image from 'next/image'
const Page = () => {

      const [banner, setBanner] = useState([])
      const [loading, setLoading] = useState(false)
      const getBanner = async () => {
            try {
                  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAeW9wbWFpbC5jb20iLCJfaWQiOiI2NWE3OWM0OTg3YjUwZTI4MjhjYmVhYWQiLCJyb2xlIjoidXNlciIsImlhdCI6MTcwOTAxNjM3MywiZXhwIjoxNzExNjA4MzczfQ.kuJEQqHPLARdCtHU9HA7UYFZJhG2qjfpbA1nDLY88YE'

                  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                  const response = await axios.get(process.env.NEXT_PUBLIC_API_HOST + '/banners')
                  const data = await response.data;
                  if (data?.success == true) {
                        setBanner(data?.data)
                  } else {
                        toast.error(data?.message)
                  }
            } catch (error) {
                  toast.warning(error?.message)
            }
      }


      const handleStatus = async (sid, status) => {
            try {
                  setLoading(true)
                  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAeW9wbWFpbC5jb20iLCJfaWQiOiI2NWE3OWM0OTg3YjUwZTI4MjhjYmVhYWQiLCJyb2xlIjoidXNlciIsImlhdCI6MTcwOTAxNjM3MywiZXhwIjoxNzExNjA4MzczfQ.kuJEQqHPLARdCtHU9HA7UYFZJhG2qjfpbA1nDLY88YE'

                  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                  const response = await axios.put(process.env.NEXT_PUBLIC_API_HOST + '/banners/' + sid, {
                        status: status
                  })
                  const data = await response.data;
                  if (data?.success == true) {
                        toast.success(data?.message)
                        setLoading(false)
                  } else {
                        toast.error(data?.message)
                        setLoading(false)
                  }
            } catch (error) {
                  toast.warning(error?.message)
                  setLoading(false)
            }
      }

      useEffect(() => {
            getBanner();
      }, [banner]);


      return (
            <div className='shadow-lg shadow-indigo-500/40 rounded-md bg-white p-5 w-full max-w-7xl'>
                  <div className="topHeading flex justify-between pt-3 pb-8 px-3">
                        <h1 className="text-xl font-bold">Banner Management</h1>
                        <Link href="/admin/user/add"><button className="bg-[#05ad05] text-xs px-4 py-2 rounded-lg text-white">Add +</button></Link>
                  </div>
                  {
                        banner.length == 0 ? (
                              <TableShimmer />
                        ) : (
                              <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                <tr>
                                                      <th scope="col" className="px-6 py-3">
                                                            Sr. No
                                                      </th>
                                                      <th scope="col" className="px-6 py-3">
                                                            Name
                                                      </th>
                                                      <th scope="col" className="px-6 py-3">
                                                            Group ID
                                                      </th>
                                                      <th scope="col" className="px-6 py-3">
                                                            Image
                                                      </th>
                                                      <th scope="col" className="px-6 py-3">
                                                            <div className="flex items-center">
                                                                  Status
                                                            </div>
                                                      </th>
                                                      <th scope="col" className="px-6 py-3">
                                                            <div className="flex items-center">
                                                                  Action
                                                            </div>
                                                      </th>
                                                </tr>
                                          </thead>
                                          <tbody>


                                                {
                                                      banner.map((item, index) => {

                                                            return (
                                                                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={item._id}>
                                                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                                              {index + 1}
                                                                        </th>
                                                                        <th scope="row" className="uppercase px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                                              {item.name}
                                                                        </th>
                                                                        <td className="px-6 py-4">
                                                                              {item.groupID}
                                                                        </td>
                                                                        <td className="px-6 py-4">
                                                                              <Image
                                                                                    src={item.images}
                                                                                    width={250}
                                                                                    height={250}
                                                                                    alt="/products/ghee.png"
                                                                              />
                                                                        </td>
                                                                        <td className="px-6 py-4">
                                                                              {
                                                                                    item.status == 'Active' ?
                                                                                          <div className="bg-emerald-400 px-3 py-1 text-center rounded-lg text-white cursor-pointer hover:bg-lime-400" onClick={(e) => handleStatus(item._id, 'Deactive')}>{loading ? ".." : 'Active'}</div> :
                                                                                          <div className="bg-red-500 px-3 py-1 text-center rounded-lg text-white cursor-pointer hover:bg-violet-500" onClick={(e) => handleStatus(item._id, 'Active')}>{loading ? ".." : 'Deactive'}</div>
                                                                              }
                                                                        </td>
                                                                        <td className=" px-6 py-4 h-full">
                                                                              {
                                                                                    <div className="flex gap-1">
                                                                                          <Link href={`/admin/user/${item._id}`} title="Edit/ View" className="font-medium text-blue-600 dark:text-blue-500 hover:underline"><FaEdit /></Link>
                                                                                          <DeleteBanner id={item._id} onSetBanner={setBanner} />
                                                                                    </div>
                                                                              }
                                                                        </td>
                                                                  </tr>
                                                            )
                                                      })
                                                }

                                          </tbody>
                                    </table>
                              </div>

                        )
                  }
            </div>
      )
}

export default Page