"use client"

import Link from "next/link"
import React, { useEffect, useState } from 'react'
import axios from "axios"
import { toast } from "sonner";
import TableShimmer from "@/components/shimmers/tableShimmer";
import { FaEdit } from "react-icons/fa";
import DeleteSetup from "@/components/admin/user/DeleteSetup";
import Pagination from "@/components/admin/Pagination";

const Page = ({ searchParams }) => {

      const [user, setUser] = useState([])
      const [loading, setLoading] = useState(false)
      const [nextUrl, setNextUrl] = useState(null)
      const [preUrl, setPreUrl] = useState(null)
      const [totalPagesData, setTotalPages] = useState("")
      const [page, setPage] = useState(1)
      const [limit, setLimit] = useState(4)

      const getUser = async () => {
            try {
                  if (searchParams.page >= 1) {
                        // setUser([])
                        const paramPage = searchParams.page
                        setPage(paramPage)
                  }
                  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAeW9wbWFpbC5jb20iLCJfaWQiOiI2NWE3OWM0OTg3YjUwZTI4MjhjYmVhYWQiLCJyb2xlIjoidXNlciIsImlhdCI6MTcwOTAxNjM3MywiZXhwIjoxNzExNjA4MzczfQ.kuJEQqHPLARdCtHU9HA7UYFZJhG2qjfpbA1nDLY88YE'

                  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                  const response = await axios.get(process.env.NEXT_PUBLIC_API_HOST + `/user/list?page=${page}&limit=${limit}`)
                  const data = await response.data;
                  if (data?.success == true) {
                        // setTotalData(data?.totalItems)
                        setTotalPages(data?.totalPages)
                        setUser(data?.data)
                        if (data?.nextpage) {
                              setNextUrl(data?.nextpage)
                        }

                        if (data?.prepage) {
                              setPreUrl(data?.nextpage)
                        }
                  } else {
                        toast.error(data?.message)
                  }
            } catch (error) {
                  toast.warning(error?.message)
            }
      }

      let pageNumbers = []
      for (let i = page - 3; i <= page + 3; i++) {
            if (i < 1) continue;
            if (i > totalPagesData) break;
            pageNumbers.push(i)
      }

      const handleStatus = async (sid) => {
            try {
                  setLoading(true)
                  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAeW9wbWFpbC5jb20iLCJfaWQiOiI2NWE3OWM0OTg3YjUwZTI4MjhjYmVhYWQiLCJyb2xlIjoidXNlciIsImlhdCI6MTcwOTAxNjM3MywiZXhwIjoxNzExNjA4MzczfQ.kuJEQqHPLARdCtHU9HA7UYFZJhG2qjfpbA1nDLY88YE'

                  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                  const response = await axios.post(process.env.NEXT_PUBLIC_API_HOST + '/user/status/' + sid)
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
            const getUser = async () => {
                  try {
                        if (searchParams.page >= 1) {
                              // setUser([])
                              const paramPage = searchParams.page
                              setPage(paramPage)
                        }
                        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAeW9wbWFpbC5jb20iLCJfaWQiOiI2NWE3OWM0OTg3YjUwZTI4MjhjYmVhYWQiLCJyb2xlIjoidXNlciIsImlhdCI6MTcwOTAxNjM3MywiZXhwIjoxNzExNjA4MzczfQ.kuJEQqHPLARdCtHU9HA7UYFZJhG2qjfpbA1nDLY88YE'

                        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                        const response = await axios.get(process.env.NEXT_PUBLIC_API_HOST + `/user/list?page=${page}&limit=${limit}`)
                        const data = await response.data;
                        if (data?.success == true) {
                              // setTotalData(data?.totalItems)
                              setTotalPages(data?.totalPages)
                              setUser(data?.data)
                              if (data?.nextpage) {
                                    setNextUrl(data?.nextpage)
                              }

                              if (data?.prepage) {
                                    setPreUrl(data?.nextpage)
                              }
                        } else {
                              toast.error(data?.message)
                        }
                  } catch (error) {
                        toast.warning(error?.message)
                  }
            }

            getUser();
      }, [user, page, limit, searchParams.page]);


      return (
            <div className='shadow-lg shadow-indigo-500/40 rounded-md bg-white p-5 w-full max-w-7xl'>
                  <div className="topHeading flex justify-between pt-3 pb-8 px-3">
                        <h1 className="text-xl font-bold">User Management</h1>
                        <Link href="/admin/user/add"><button className="bg-[#05ad05] text-xs px-4 py-2 rounded-lg text-white">Add +</button></Link>
                  </div>
                  {
                        user.length == 0 ? (
                              <TableShimmer />
                        ) : (
                              <>
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
                                                                  Phone
                                                            </th>
                                                            <th scope="col" className="px-6 py-3">
                                                                  Email
                                                            </th>
                                                            <th scope="col" className="px-6 py-3">
                                                                  Wallet
                                                            </th>
                                                            <th scope="col" className="px-6 py-3">
                                                                  Role
                                                            </th>
                                                            <th scope="col" className="px-6 py-3">
                                                                  <div className="flex items-center">
                                                                        Status
                                                                  </div>
                                                            </th>
                                                            <th scope="col" className="px-6 py-3">
                                                                  Registered On
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
                                                            user.map((item, index) => {
                                                                  let date1 = new Date(item.createdAt).toDateString()

                                                                  return (
                                                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={item._id}>
                                                                              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                                                    {index + 1}
                                                                              </th>
                                                                              <th scope="row" className="uppercase px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                                                    {item.name}
                                                                              </th>
                                                                              <td className="px-6 py-4">
                                                                                    {item.phone}
                                                                              </td>
                                                                              <td className="px-6 py-4">
                                                                                    {item.email}
                                                                              </td>
                                                                              <td className="px-6 py-4">
                                                                                    ₹ {
                                                                                          item.wallet == null ? 0 : item.wallet
                                                                                    }
                                                                              </td>
                                                                              <td className="px-6 py-4">
                                                                                    {item.role}
                                                                              </td>
                                                                              <td className="px-6 py-4">
                                                                                    {item.role == 'user' ?
                                                                                          item.status ?
                                                                                                <div className="bg-emerald-400 px-3 py-1 text-center rounded-lg text-white cursor-pointer hover:bg-lime-400" onClick={(e) => handleStatus(item._id)}>{loading ? ".." : 'On'}</div> :
                                                                                                <div className="bg-red-500 px-3 py-1 text-center rounded-lg text-white cursor-pointer hover:bg-violet-500" onClick={(e) => handleStatus(item._id)}>{loading ? ".." : 'Off'}</div>
                                                                                          :
                                                                                          <div className="text-indigo-500 font-bold">Admin</div>
                                                                                    }
                                                                              </td> <td className="px-6 py-4">
                                                                                    {date1}
                                                                              </td>
                                                                              <td className=" px-6 py-4 h-full">
                                                                                    {item.role == 'user' ?
                                                                                          <div className="flex gap-1">
                                                                                                <Link href={`/admin/user/${item._id}`} title="Edit/ View" className="font-medium text-blue-600 dark:text-blue-500 hover:underline"><FaEdit /></Link>
                                                                                                <DeleteSetup id={item._id} onSetUser={setUser} />
                                                                                          </div>
                                                                                          :
                                                                                          <div className="text-indigo-500 font-bold">Admin</div>
                                                                                    }
                                                                              </td>
                                                                        </tr>
                                                                  )
                                                            })
                                                      }

                                                </tbody>
                                          </table>
                                          <Pagination />
                                    </div>
                              </>
                        )
                  }
            </div>
      )
}

export default Page