"use client"

import Link from "next/link"
import React, { useEffect, useState } from 'react'
import axios from "axios"
import { toast } from "sonner";
import TableShimmer from "@/components/shimmers/tableShimmer";
import { FaEdit } from "react-icons/fa";
import DeleteSetup from "@/components/admin/amount/DeleteSetup";
import Image from 'next/image'

const Page = () => {

      const [bank, setBank] = useState([])
      const getBank = async () => {
            try {
                  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAeW9wbWFpbC5jb20iLCJfaWQiOiI2NWE3OWM0OTg3YjUwZTI4MjhjYmVhYWQiLCJyb2xlIjoidXNlciIsImlhdCI6MTcwOTAxNjM3MywiZXhwIjoxNzExNjA4MzczfQ.kuJEQqHPLARdCtHU9HA7UYFZJhG2qjfpbA1nDLY88YE'
                  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                  const response = await axios.get(process.env.NEXT_PUBLIC_API_HOST + '/bankaccount/list')
                  const data = await response.data;
                  if (data?.success == true) {
                        setBank(data?.data)
                  } else {
                        toast.error(data?.message)
                  }
            } catch (error) {
                  toast.warning(error?.message)
            }
      }

      useEffect(() => {
            getBank();
      }, [bank]);

      return (
            <div className='shadow-lg shadow-indigo-500/40 rounded-md bg-white p-5 w-full max-w-5xl'>
                  <div className="topHeading flex justify-between pt-3 pb-8 px-3">
                        <h1 className="text-xl font-bold">Bank Details</h1>
                        <Link href="/admin/amount/add"><button className="bg-[#05ad05] text-xs px-4 py-2 rounded-lg text-white">Add +</button></Link>
                  </div>
                  {
                        bank.length == 0 ? (
                              <TableShimmer />
                        ) : (
                              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                          <tr>
                                                <th scope="col" className="px-6 py-3">
                                                      Sr. No
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                      Bank name
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                      <div className="flex items-center">
                                                            Account number
                                                      </div>
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                      <div className="flex items-center">
                                                            Account holder name
                                                      </div>
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                      <div className="flex items-center">
                                                            IFSC Code
                                                      </div>
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                      <div className="flex items-center">
                                                            UPI ID
                                                      </div>
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                      <div className="flex items-center">
                                                            QR Image
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
                                                bank.map((item, index) => {
                                                      return (
                                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={item._id}>
                                                                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                                        {index + 1}
                                                                  </th>
                                                                  <th scope="row" className="uppercase px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                                        {item.bankName}
                                                                  </th>
                                                                  <td className="px-6 py-4">
                                                                        {item.accountNumber}
                                                                  </td>
                                                                  <td className="px-6 py-4">
                                                                        {item.accountHolderName}
                                                                  </td>
                                                                  <td className="px-6 py-4">
                                                                        {item.ifscCode}
                                                                  </td>
                                                                  <td className="px-6 py-4">
                                                                        {item.upiId}
                                                                  </td>
                                                                  <td className="px-6 py-4">
                                                                        <Image
                                                                              src={item.imageBarcode}
                                                                              width={250}
                                                                              height={250}
                                                                              alt="/products/ghee.png"
                                                                        />
                                                                  </td>
                                                                  <td className="flex items-cqenter px-6 py-4">
                                                                        <Link href={`/admin/amount/${item._id}`} title="Edit" className="font-medium text-blue-600 dark:text-blue-500 hover:underline"><FaEdit /></Link>
                                                                        <DeleteSetup id={item._id} onSetBank={setBank} />
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

export default Page