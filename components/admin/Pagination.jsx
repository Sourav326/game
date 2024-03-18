"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
const Pagination = ({ searchParams }) => {
    const [totalPagesData, setTotalPages] = useState("")
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(4)
    let pageNumbers = []
    for (let i = page - 3; i <= page + 3; i++) {
        if (i < 1) continue;
        if (i > totalPagesData) break;
        pageNumbers.push(i)
    }

    if (searchParams.page >= 1) {
        const paramPage = searchParams.page
        setPage(paramPage)
    }
    return (
        <div className="py-10">
            <nav aria-label="Page navigation example flex justify-center">
                <ul className="flex items-center -space-x-px h-10 text-base justify-center">

                    {/* { - 1 >= page1 && (
                                                                 
                                                                        <li>
                                                                              <Link href={`/admin/user?page=${page - 1}`} className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                                                                    <span className="sr-only">Previous</span>
                                                                                    <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                                                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                                                                                    </svg>
                                                                              </Link>
                                                                        </li>
                                                              
                                                            )

                                                            } */}



                    {
                        pageNumbers.map((item, index) =>
                            <li key={index}>
                                <Link href={`/admin/user?page=${item}`} className={`${item == page ? "bg-purple-500 text-white hover:bg-purple-500 hover:text-white" : "bg-white"} flex items-center justify-center px-4 h-10 leading-tight text-gray-500 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>{item}</Link>
                            </li>
                        )
                    }

                    {/* {nextUrl != null && (
                                                                  

                                                                        <li>
                                                                              <Link href={nextUrl} className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                                                                    <span className="sr-only">Next</span>
                                                                                    <svg className="w-3 h-3 rtl:rotate-180" ariaHidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                                                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                                                                    </svg>
                                                                              </Link>
                                                                        </li>
                                                            
                                                            )
                                                            } */}

                </ul>
            </nav>
        </div>
    )
}

export default Pagination

