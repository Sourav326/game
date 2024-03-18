"use client"

import Link from "next/link"
import React, { useEffect, useState } from 'react'
import axios from "axios"
import { toast } from "sonner";
import TableShimmer from "@/components/shimmers/tableShimmer";
import { FaEdit } from "react-icons/fa";
import DeleteSetup from "@/components/admin/user/DeleteSetup";
import { IoCheckmarkCircle } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { MdPending } from "react-icons/md";

const page = () => {

      const [betting, setBetting] = useState([])
      const [loading, setLoading] = useState(false)
      const getBetting = async () => {
            try {
                  const token = localStorage.getItem("JWTtoken")
                  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                  const response = await axios.get(process.env.NEXT_PUBLIC_API_HOST + '/games')
                  const data = await response.data;
                  if (data?.success == true) {
                        setBetting(data?.data)
                  } else {
                        toast.error(data?.message)
                  }
            } catch (error) {
                  toast.warning(error?.message)
            }
      }

      

      useEffect(() => {
            getBetting();
      }, [betting]);
      return (
            <>
            <div className='shadow-lg shadow-indigo-500/40 rounded-md bg-white p-5 w-full max-w-7xl mb-5'>
                  <div className="grid gap-4 grid-cols-4">
                        <div className="py-3 px-10 bg-violet-400 text-white font-bold rounded-lg">
                              Total Betting Amount: ₹387567898
                        </div>
                        <div className="py-3 px-10 bg-violet-400 text-white font-bold rounded-lg">
                              Today Betting Amount: ₹57663
                        </div>
                        <div className="py-3 px-10 bg-violet-400 text-white font-bold rounded-lg">
                              Total Win Amount: ₹97544567
                        </div>
                        <div className="py-3 px-10 bg-violet-400 text-white font-bold rounded-lg">
                              Today Win Amount: ₹5709
                        </div>
                  </div>
            </div>
            <div className='shadow-lg shadow-indigo-500/40 rounded-md bg-white p-5 w-full max-w-7xl'>
                  <div className="topHeading flex justify-between pt-3 pb-8 px-3">
                        <h1 className="text-xl font-bold">Betting Management</h1>
                  </div>
                  {
                        betting.length == 0 ? (
                              <TableShimmer />
                        ) : (
                              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                          <tr>
                                                <th scope="col" className="px-6 py-3">
                                                      Sr. No
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                      Game ID
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                      User ID
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                       Amount
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                      Win Amount
                                                </th>
                                                <th scope="col" className="px-6 py-3">

                                                      Created On
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                      <div className="flex items-center">
                                                            Status
                                                      </div>
                                                </th>
                                          </tr>
                                    </thead>
                                    <tbody>


                                          {
                                                betting.map((item, index) => {
                                                      let date1 = new Date(item.createdOn).toDateString()
                                                      return (
                                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={item._id}>
                                                                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                                        {index + 1}
                                                                  </th>
                                                                  <th scope="row" className="uppercase px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                                        {item.gameID}
                                                                  </th>
                                                                  <th scope="row" className="uppercase px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                                        {item.userID}
                                                                  </th>
                                                                  <td className="px-6 py-4">
                                                                        ₹ {
                                                                              item.amount
                                                                        }
                                                                  </td>
                                                                  <td className="px-6 py-4">
                                                                        {item.winAmount}
                                                                  </td>
                                                                  <td className="px-6 py-4">
                                                                        {date1}
                                                                  </td>
                                                                  <td className="px-6 py-4">
                                                                        {item.status}
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
            </>
      )
}

export default page