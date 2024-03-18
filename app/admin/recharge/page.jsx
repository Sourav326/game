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

      const [recharge, setRecharge] = useState([])
      const [loading, setLoading] = useState(false)
      const getRecharge = async () => {
            try {
                  const token = localStorage.getItem("JWTtoken")
                  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                  const response = await axios.get(process.env.NEXT_PUBLIC_API_HOST + '/user/transaction/list')
                  const data = await response.data;
                  if (data?.success == true) {
                        setRecharge(data?.data)
                  } else {
                        toast.error(data?.message)
                  }
            } catch (error) {
                  toast.warning(error?.message)
            }
      }


      const handleStatus = async (sid, status) => {
            try {
                  // setLoading(true)
                  const token = localStorage.getItem("JWTtoken")
                  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                  const response = await axios.post(process.env.NEXT_PUBLIC_API_HOST + '/user/transaction/status/' + sid, {
                        status: status
                  })
                  const data = await response.data;
                  if (data?.success == true) {
                        toast.success(data?.message)
                        // setLoading(false)
                  } else {
                        toast.error(data?.message)
                        // setLoading(false)
                  }
            } catch (error) {
                  toast.warning(error?.message)
                  // setLoading(false)
            }
      }

      useEffect(() => {
            getRecharge();
      }, [recharge]);
      return (
            <div className='shadow-lg shadow-indigo-500/40 rounded-md bg-white p-5 w-full max-w-7xl'>
                  <div className="topHeading flex justify-between pt-3 pb-8 px-3">
                        <h1 className="text-xl font-bold">Recharge Management</h1>
                        
                  </div>
                  {
                        recharge.length == 0 ? (
                              <TableShimmer />
                        ) : (
                              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                          <tr>
                                                <th scope="col" className="px-6 py-3">
                                                      Sr. No
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                      User ID
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                      Name
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                      Phone
                                                </th>
                                                <th scope="col" className="px-6 py-3">

                                                      Payment Type
                                                </th>
                                                <th scope="col" className="px-6 py-3">

                                                      Amount
                                                </th>
                                                <th scope="col" className="px-6 py-3">

                                                      Transaction ID
                                                </th>
                                                <th scope="col" className="px-6 py-3">

                                                      Created On
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
                                                recharge.map((item, index) => {
                                                      let date1 = new Date(item.createdAt).toDateString()

                                                      let statusButton
                                                      if (item.status == 'pending') {
                                                            statusButton = <MdPending className="bg-yellow-500 text-white text-3xl rounded-full p-1" title="Pending" />
                                                      } else if (item.status == 'cancel') {
                                                            statusButton = <MdCancel className="bg-red-500 text-white text-3xl rounded-full p-1" title="Cancelled" />
                                                      } else {
                                                            statusButton = <IoCheckmarkCircle className="bg-green-500 text-white text-3xl rounded-full p-1" title="Approved" />
                                                      }

                                                      let statusActionButton
                                                      if (item.status == 'pending') {
                                                            statusActionButton = <>
                                                                  <div className="bg-green-500 px-3 py-1 text-center rounded-lg text-white cursor-pointer hover:bg-green-700" onClick={(e) => handleStatus(item._id, "1")}>{loading ? "loading.." : 'Approve'}</div>
                                                                  <div className="bg-red-500 px-3 py-1 text-center rounded-lg text-white cursor-pointer hover:bg-red-700" onClick={(e) => handleStatus(item._id, "0")}>{loading ? "loading.." : 'Cancel'}</div>
                                                            </>
                                                      } else if(item.status == 'cancel'){
                                                            statusActionButton = <div className="bg-red-300 px-3 py-1 text-center rounded-lg text-white" >Cancelled</div>
                                                      }else {
                                                            statusActionButton = <div className="bg-green-300 px-3 py-1 text-center rounded-lg text-white" >Approved</div>
                                                      }

                                                      return (
                                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={item._id}>
                                                                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                                        {index + 1}
                                                                  </th>
                                                                  <th scope="row" className="uppercase px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                                        {index + 1}
                                                                  </th>
                                                                  <td className="px-6 py-4">
                                                                        {item.name}
                                                                  </td>
                                                                  <td className="px-6 py-4">
                                                                        {item.phone}
                                                                  </td>
                                                                  <td className="px-6 py-4 ">
                                                                        <div className="bg-[#2d2dff] px-3 text-xs py-1 text-center rounded-xl text-white">{item.paymentType}</div>
                                                                  </td>
                                                                  <td className="px-6 py-4">
                                                                        ₹ {
                                                                              item.amount == null ? 0 : item.amount
                                                                        }
                                                                  </td>
                                                                  <td className="px-6 py-4">
                                                                        {item.transactionId}
                                                                  </td>
                                                                  <td className="px-6 py-4">
                                                                        {date1}
                                                                  </td>
                                                                  <td className="px-6 py-4">
                                                                        {statusButton}
                                                                  </td>
                                                                  <td className="px-6 py-4">
                                                                        <div className="flex gap-2">
                                                                              {statusActionButton}
                                                                        </div>
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