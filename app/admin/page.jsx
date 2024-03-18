'use client'

import Card from "@/components/admin/Card"
import ProfileShimmer from "@/components/shimmers/profileShimmer"
import Link from "next/link"
import { useState, useEffect } from "react"
import axios from "axios"
import { toast } from "sonner";

const Dashboard = () => {


      const [cardData, setCardData] = useState('')
      const getCardData = async () => {
            try {
                  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAeW9wbWFpbC5jb20iLCJfaWQiOiI2NWE3OWM0OTg3YjUwZTI4MjhjYmVhYWQiLCJyb2xlIjoidXNlciIsImlhdCI6MTcwOTAxNjM3MywiZXhwIjoxNzExNjA4MzczfQ.kuJEQqHPLARdCtHU9HA7UYFZJhG2qjfpbA1nDLY88YE'

                  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                  const response = await axios.get(process.env.NEXT_PUBLIC_API_HOST + '/admin/dashboard')
                  const data = await response.data;
                  if (data?.success == true) {
                        setCardData(data.data)
                  } else {
                        toast.error(data?.message)
                  }
            } catch (error) {
                  toast.warning(error?.message)
            }
      }

      useEffect(() => {
            getCardData();
      }, []);
      return cardData.length == 0 ? (
            <ProfileShimmer />
      ) : (
            <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 pb-12">
                        <Card title="Today User" value={cardData.TodayUser} color="bg-gradient-to-r from-pink-400 to-red-300" />
                        <Card title="Total User" value={cardData.TotalUser} color="bg-gradient-to-r from-pink-400 to-red-300" />
                        <Card title="Today Recharge" value={cardData.TodayRecharge + ' (₹ ' + cardData.todayRechargeSum + ')'} color="bg-gradient-to-r from-pink-400 to-red-300" />
                        <Card title="Total Pending Recharge" value={cardData.TotalPendingRecharge + ' (₹ ' + cardData.TotalPendingRechargeSum + ')'} color="bg-gradient-to-r from-blue-400 to-purple-300" />
                        <Card title="Total Recharge" value={cardData.TotalRecharge + ' (₹ ' + cardData.TotalRechargeSum + ')'} color="bg-gradient-to-r from-blue-400 to-purple-300" />
                        <Card title="Today Withdrawal" value={cardData.TodayWithdrawal + ' (₹ ' + cardData.TodayWithdrawalSum + ')'} color="bg-gradient-to-r from-pink-400 to-red-300" />
                        <Card title="Today Withdrawal" value={cardData.TodayWithdrawal} color="bg-gradient-to-r from-pink-400 to-red-300" />
                        <Card title="Today Withdrawal" value={cardData.TodayWithdrawal} color="bg-gradient-to-r from-pink-400 to-red-300" />
                        <Card title="Today Withdrawal" value={cardData.TodayWithdrawal} color="bg-gradient-to-r from-green-400 to-yellow-300" />
                        <Card title="Today Withdrawal" value={cardData.TodayWithdrawal} color="bg-gradient-to-r from-green-400 to-yellow-300" />
                        <Card title="Today Withdrawal" value={cardData.TodayWithdrawal} color="bg-gradient-to-r from-green-400 to-yellow-300" />
                  </div>
                  <div className='shadow-lg shadow-indigo-500/40 rounded-md bg-white p-5 mb-12'>
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                          <th scope="col" className="px-6 py-3">
                                                Product name
                                          </th>
                                          <th scope="col" className="px-6 py-3">
                                                <div className="flex items-center">
                                                      Color

                                                </div>
                                          </th>
                                          <th scope="col" className="px-6 py-3">
                                                <div className="flex items-center">
                                                      Category

                                                </div>
                                          </th>
                                          <th scope="col" className="px-6 py-3">
                                                <div className="flex items-center">
                                                      Price
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
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Apple MacBook Pro 17
                                          </th>
                                          <td className="px-6 py-4">
                                                Silver
                                          </td>
                                          <td className="px-6 py-4">
                                                Laptop
                                          </td>
                                          <td className="px-6 py-4">
                                                $2999
                                          </td>
                                          <td className="px-6 py-4">
                                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                          </td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Microsoft Surface Pro
                                          </th>
                                          <td className="px-6 py-4">
                                                White
                                          </td>
                                          <td className="px-6 py-4">
                                                Laptop PC
                                          </td>
                                          <td className="px-6 py-4">
                                                $1999
                                          </td>
                                          <td className="px-6 py-4">
                                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                          </td>
                                    </tr>
                                    <tr className="bg-white dark:bg-gray-800">
                                          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Magic Mouse 2
                                          </th>
                                          <td className="px-6 py-4">
                                                Black
                                          </td>
                                          <td className="px-6 py-4">
                                                Accessories
                                          </td>
                                          <td className="px-6 py-4">
                                                $99
                                          </td>
                                          <td className="px-6 py-4">
                                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                          </td>
                                    </tr>
                              </tbody>
                        </table>
                  </div>
            </>
      )
}

export default Dashboard