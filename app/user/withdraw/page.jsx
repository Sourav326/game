"use client"
import React, { useEffect, useState } from 'react'
import axios from "axios"
import { toast } from "sonner";
import ProfileShimmer from '@/components/shimmers/profileShimmer';
import { jwtDecode } from "jwt-decode";

const Page = () => {

    const [loading, setLoading] = useState(false)

    const [amount, setAmount] = useState('')
    const [accountNumber, setAccountNumber] = useState('')
    const [accountHolderName, setAccountHolderName] = useState('')
    const [ifscCode, setIfscCode] = useState('')
    const [bankName, setBankName] = useState('')

    const [isAmountError, setIsAmountError] = useState(false)
    const [isAccountNumberError, setIsAccountNumberError] = useState(false)
    const [isAccountHolderNameError, setIsAccountHolderNameError] = useState(false)
    const [isIfscCodeError, setIsIfscCodeError] = useState(false)
    const [isBankNameError, setIsBankNameError] = useState(false)



    const hanleAmountChange = (e) => {
        setAmount(e.target.value)
        if (e.target.value == "") {
            setIsAmountError(true)
        } else {
            setIsAmountError(false)
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

    return (
        <>
            <div className="grid md:grid-cols-9 gap-4 py-4">
                <div className="rounded-xl bg-[#2e2e2eab] flex justify-between p-3 text-white col-span-5 col-start-3">
                    <div className="bg-white p-3 border-t-4 border-green-400 w-full rounded-xl">

                        <form className="space-y-6 md:px-5">
                            <h5 className="text-xl font-medium dark:text-white text-red-500 pb-5 capitalize">withdraw Request:</h5>
                            <div className='flex gap-4 flex-col md:flex-row'>
                                <div className='w-full'>
                                    <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount to withdraw</label>
                                    <input type="number" name="amount" id="amount" value={amount} onChange={hanleAmountChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter Amount" required />
                                    <span className="text-red-500 text-sm">{isAmountError ? "Amount is required" : ""}</span>
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
                            <button onClick={handleSubmit} className="w-auto text-white bg-[#05ad05] hover:bg-[#fee923] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" disabled={loading}>{loading ? "Loading..." : "Withdraw"}</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page