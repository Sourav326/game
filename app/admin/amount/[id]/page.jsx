
"use client"
import React, { useEffect, useState } from 'react'
import axios from "axios"
import { toast } from "sonner";
import ProfileShimmer from '@/components/shimmers/profileShimmer';

const page = ({params}) => {
      const id = params.id
      const [name, setName] = useState('')
      const [value, setValue] = useState('')
      const [isNameError, setIsNameError] = useState(false)
      const [isValueError, setIsValueError] = useState(false)
      const [loading, setLoading] = useState(false)
      const [setup, setSetup] = useState('')
      const getSetup = async () => {
            try {
                  const token = localStorage.getItem("JWTtoken")
                  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                  const response = await axios.get(process.env.NEXT_PUBLIC_API_HOST + '/settings/'+id)
                  const data = await response.data;
                  if (data?.success == true) {
                        setSetup(data.data)
                        setName(data.data.name)
                        setValue(data.data.value)
                  } else {
                        toast.error(data?.message)
                  }
            } catch (error) {
                  toast.warning(error?.message)
            }
      }

      useEffect(() => {
            getSetup();
      }, []);


      const hanleNameChange = (e) => {
            setName(e.target.value)
            if (e.target.value == "") {
                  setIsNameError(true)
            } else {
                  setIsNameError(false)
            }
      }

      const hanleValueChange = (e) => {
            setValue(e.target.value)
            if (e.target.value == "") {
                  setIsValueError(true)
            } else {
                  setIsValueError(false)
            }
      }

      const handleSubmit = async (e) => {
            e.preventDefault()
            if (name === "" || !name) {
                  setIsNameError(true);
                  return false;
              }
              if (value === "" || !value) {
                  setIsValueError(true)
                  return false;
              }
              setLoading(true)
            try {
                  let response = await axios.put(process.env.NEXT_PUBLIC_API_HOST + '/settings/'+id, {
                        name: name,
                        value: value,
                  });
                  const data = await response.data;

                  if (data?.success == true) {
                        toast.success(data.message)
                        setLoading(false)
                        // router.push("/admin/amount")
                  } else {
                        toast.error(data.message)
                  }
            } catch (error) {
                  toast.error(error)
            }
      }
     
      return setup.length == 0 ? (
            <ProfileShimmer />
      ) : (

            <div className='shadow-lg shadow-indigo-500/40 rounded-md bg-white p-5 w-full max-w-3xl'>
                  <form className="space-y-6">
                        <h5 className="text-xl font-medium text-gray-900 dark:text-white">Edit Setup Details</h5>
                        <div>
                              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Setup Name</label>
                              <input type="text" onChange={hanleNameChange}  value={name} name="name" id="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder="Enter setup name" disabled/>
                              <span className="text-red-500 text-sm">{isNameError ? "Name required" : "" }</span>
                        </div>
                        <div>
                              <label htmlFor="value" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Setup Value</label>
                              <input type="text" onChange={hanleValueChange} value={value} name="value" id="value" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder="Enter setup value" />
                              <span className="text-red-500 text-sm">{isValueError ? "Value required" : "" }</span>

                        </div>
                        <button onClick={handleSubmit}  type="submit" className="max-w-xs w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"disabled={loading}>{loading ? "Loading..." : "Update setup"}</button>
                  </form>
            </div>
      )
}

export default page