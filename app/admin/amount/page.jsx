"use client"

import Link from "next/link"
import React, { useEffect, useState } from 'react'
import axios from "axios"
import { toast } from "sonner";
import TableShimmer from "@/components/shimmers/tableShimmer";
import { FaEdit } from "react-icons/fa";
import DeleteSetup from "@/components/admin/amount/DeleteSetup";

const page = () => {

      const [setting, setSetting] = useState([])
      const getSetting = async () => {
            try {
                  const token = localStorage.getItem("JWTtoken")
                  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                  const response = await axios.get(process.env.NEXT_PUBLIC_API_HOST + '/settings/')
                  const data = await response.data;
                  if (data?.success === true) {
                        setSetting(data?.data)
                  } else if(data?.success === false){
                        toast.error(data?.message)
                  }
            } catch (error) {
                  toast.warning(error?.message)
            }
      }

      useEffect(() => {
            getSetting();
      }, [setting]);

      return (
            <div className='shadow-lg shadow-indigo-500/40 rounded-md bg-white p-5 w-full max-w-3xl'>
                  <div className="topHeading flex justify-between pt-3 pb-8 px-3">
                        <h1 className="text-xl font-bold">Amount Setup</h1>
                        <Link href="/admin/amount/add"><button className="bg-[#05ad05] text-xs px-4 py-2 rounded-lg text-white">Add +</button></Link>
                  </div>
                  {
                        setting.length == 0 ? (
                              <TableShimmer />
                        ) : (
                              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                          <tr>
                                                <th scope="col" className="px-6 py-3">
                                                      Sr. No
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                      Setting name
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                      <div className="flex items-center">
                                                            Value
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
                                                setting.map((item, index) => {
                                                      return (
                                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={item._id}>
                                                                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                                        {index + 1}
                                                                  </th>
                                                                  <th scope="row" className="uppercase px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                                        {item.name}
                                                                  </th>
                                                                  <td className="px-6 py-4">
                                                                        {item.value}
                                                                  </td>
                                                                  <td className="flex items-cqenter px-6 py-4">
                                                                        <Link href={`/admin/amount/${item._id}`} title="Edit" className="font-medium text-blue-600 dark:text-blue-500 hover:underline"><FaEdit /></Link>
                                                                        <DeleteSetup id={item._id} onSetSetting={setSetting} />
                                                                  </td>
                                                            </tr>
                                                      )
                                                })
                                          }

                                    </tbody>
                              </table>

                        )
                  }
            </div>
      )
}

export default page