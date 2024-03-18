"use client"
import React, { useEffect, useState } from 'react'
import axios from "axios"
import { toast } from "sonner";
import ProfileShimmer from '@/components/shimmers/profileShimmer';
import { jwtDecode } from "jwt-decode";
import Image from 'next/image'

const Page = () => {

    const [bank, setBank] = useState('')
    const [loading, setLoading] = useState(false)

    const [amount, setAmount] = useState('')
    const [transactionNumber, setTransactionNumber] = useState('')
    const [accountNumber, setAccountNumber] = useState('')
    const [accountHolderName, setAccountHolderName] = useState('')
    const [ifscCode, setIfscCode] = useState('')
    const [bankName, setBankName] = useState('')

    const [isAmountError, setIsAmountError] = useState(false)
    const [isTransactionNumberError, setIsTransactionNumberError] = useState(false)
    const [isAccountNumberError, setIsAccountNumberError] = useState(false)
    const [isAccountHolderNameError, setIsAccountHolderNameError] = useState(false)
    const [isIfscCodeError, setIsIfscCodeError] = useState(false)
    const [isBankNameError, setIsBankNameError] = useState(false)

    const getBank = async () => {
        try {
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAeW9wbWFpbC5jb20iLCJfaWQiOiI2NWE3OWM0OTg3YjUwZTI4MjhjYmVhYWQiLCJyb2xlIjoidXNlciIsImlhdCI6MTcwOTAxNjM3MywiZXhwIjoxNzExNjA4MzczfQ.kuJEQqHPLARdCtHU9HA7UYFZJhG2qjfpbA1nDLY88YE'


            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            const response = await axios.get(process.env.NEXT_PUBLIC_API_HOST + '/bankaccount/list')
            const data = await response.data;
            if (data?.success == true) {
                setBank(data.data)
            } else {
                toast.error(data?.message)
            }
        } catch (error) {
            toast.warning(error?.message)
        }
    }

    useEffect(() => {
        getBank();
    }, []);

    const hanleAmountChange = (e) => {
        setAmount(e.target.value)
        if (e.target.value == "") {
            setIsAmountError(true)
        } else {
            setIsAmountError(false)
        }
    }
    const hanleTransactionNumberChange = (e) => {
        setTransactionNumber(e.target.value)
        if (e.target.value == "") {
            setIsTransactionNumberError(true)
        } else {
            setIsTransactionNumberError(false)
        }
    }
    const hanleAccountNumberChange = (e) => {
        setAccountNumber(e.target.value)
        if (e.target.value == "") {
            setIsAccountNumberError(true)
        } else {
            setIsAccountNumberError(false)
        }
    }
    const hanleAccountHolderNameChange = (e) => {
        setAccountHolderName(e.target.value)
        if (e.target.value == "") {
            setIsAccountHolderNameError(true)
        } else {
            setIsAccountHolderNameError(false)
        }
    }
    const hanleIfscCodeChange = (e) => {
        setIfscCode(e.target.value)
        if (e.target.value == "") {
            setIsIfscCodeError(true)
        } else {
            setIsIfscCodeError(false)
        }
    }
    const hanleBankNameChange = (e) => {
        setBankName(e.target.value)
        if (e.target.value == "") {
            setIsBankNameError(true)
        } else {
            setIsBankNameError(false)
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (amount === "" || !amount) {
            setIsAmountError(true);
            return false;
        }
        if (transactionNumber === "" || !transactionNumber) {
            setIsTransactionNumberError(true);
            return false;
        }
        if (accountNumber === "" || !accountNumber) {
            setIsAccountNumberError(true);
            return false;
        }
        if (accountHolderName === "" || !accountHolderName) {
            setIsAccountHolderNameError(true)
            return false;
        }
        if (ifscCode === "" || !ifscCode) {
            setIsIfscCodeError(true)
            return false;
        }
        if (bankName === "" || !bankName) {
            setIsBankNameError(true)
            return false;
        }
        setLoading(true)
        try {
            let response = await axios.post(process.env.NEXT_PUBLIC_API_HOST + '/signup', {
                name: name,
                email: email,
                password: password,
                phone: mobile
            });
            const data = await response.data;
            if (data.success == true) {
                toast.success(data.message)
                router.push("/login")
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error)
        }
    }

    return bank.length == 0 ? (
        <ProfileShimmer />
    ) : (
        <>
            <div className="grid md:grid-cols-2 gap-4 py-4">
                <div className="rounded-xl bg-[#2e2e2eab] flex justify-between p-3 text-white">
                    <div className="bg-white p-3 border-t-4 border-green-400 w-full rounded-xl">
                        <div className="image overflow-hidden">
                            <Image
                                src="/https://flywin.club/storage/admin/bankdetail/barcode.jpeg"
                                width={250}
                                height={250}
                                alt="/https://flywin.club/storage/admin/bankdetail/barcode.jpeg"
                                className="h-auto w-[170px] md:w-[300px] mx-auto"
                            />
                        </div>
                        <ul
                            className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                            <li className="flex items-center py-3">
                                <span>Account Number</span>
                                <span className="ml-auto"><span
                                    className="bg-green-500 py-1 px-2 rounded text-white text-sm">{bank[0].accountNumber}</span></span>
                            </li>
                            <li className="flex items-center py-3">
                                <span>IFSC Code</span>
                                <span className="ml-auto uppercase">{bank[0].ifscCode}</span>
                            </li>
                            <li className="flex items-center py-3">
                                <span>Account Name</span>
                                <span className="ml-auto capitalize">{bank[0].accountHolderName}</span>
                            </li>
                            <li className="flex items-center py-3">
                                <span>Bank Name</span>
                                <span className="ml-auto capitalize">{bank[0].bankName}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="rounded-xl bg-[#2e2e2eab] flex justify-between p-3 text-white">
                    <div className="bg-white p-3 border-t-4 border-green-400 w-full rounded-xl">

                        <form className="space-y-6 md:px-5">
                            <h5 className="text-xl font-medium dark:text-white text-green-500 pb-5">To confirm the deposit, make a transfer to the banking details:</h5>
                            <div className='flex gap-4 flex-col md:flex-row'>
                                <div className='w-full'>
                                    <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount to credit</label>
                                    <input type="number" name="amount" id="amount" value={amount} onChange={hanleAmountChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter Amount" required />
                                    <span className="text-red-500 text-sm">{isAmountError ? "Amount is required" : ""}</span>
                                </div>
                                <div className='w-full'>
                                    <label htmlFor="transactionNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Transaction Number</label>
                                    <input type="text" name="transactionNumber" id="transactionNumber" value={transactionNumber} onChange={hanleTransactionNumberChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter Transaction Number" required />
                                    <span className="text-red-500 text-sm">{isTransactionNumberError ? "Transaction Number is required" : ""}</span>
                                </div>
                            </div>
                            <div className='flex gap-4 flex-col md:flex-row'>
                                <div className='w-full'>
                                    <label htmlFor="accountNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Account Number</label>
                                    <input type="text" name="accountNumber" id="accountNumber" value={accountNumber} onChange={hanleAccountNumberChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter Account Number" required />
                                    <span className="text-red-500 text-sm">{isAccountNumberError ? "Account Number is required" : ""}</span>
                                </div>
                                <div className='w-full'>
                                    <label htmlFor="accountHolderName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Account Holder Name</label>
                                    <input type="text" name="accountHolderName" id="accountHolderName" value={accountHolderName} onChange={hanleAccountHolderNameChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter Account Holder Name" required />
                                    <span className="text-red-500 text-sm">{isAccountHolderNameError ? "Account Holder Name is required" : ""}</span>
                                </div>
                            </div>
                            <div className='flex gap-4 flex-col md:flex-row'>
                                <div className='w-full'>
                                    <label htmlFor="ifscCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">IFSC Code</label>
                                    <input type="text" name="ifscCode" id="ifscCode" value={ifscCode} onChange={hanleIfscCodeChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter Ifsc Code" required />
                                    <span className="text-red-500 text-sm">{isIfscCodeError ? "Ifsc Code is required" : ""}</span>
                                </div>
                                <div className='w-full'>
                                    <label htmlFor="bankName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bank Name</label>
                                    <input type="text" name="bankName" id="bankName" value={bankName} onChange={hanleBankNameChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter Bank Name" required />
                                    <span className="text-red-500 text-sm">{isBankNameError ? "Bank Name is required" : ""}</span>
                                </div>
                            </div>
                            <button onClick={handleSubmit} className="w-auto text-white bg-[#ffa900] hover:bg-[#fee923] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" disabled={loading}>{loading ? "Loading..." : "Deposite"}</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page