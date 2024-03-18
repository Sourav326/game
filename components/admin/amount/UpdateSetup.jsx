"use client"

import { FaEdit } from "react-icons/fa";
import Link from "next/link"
import { useState } from "react";
import axios from "axios"
import { toast } from "sonner";

const UpdateSetup = ({ id, onSetSetting }) => {
  const Finalid = id
  const [loading, setLoading] = useState(false)

  const handleDelete = () => {
    setLoading(true)
    const sid = Finalid
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure you want to delete this setup from this platform?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            confirmDelete(sid)
          }
        },
        {
          label: 'No',
          onClick: () => {
            setLoading(false)
          }
        }
      ]
    });
  }

  const confirmDelete = async (sid) => {
    try {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAeW9wbWFpbC5jb20iLCJfaWQiOiI2NWE3OWM0OTg3YjUwZTI4MjhjYmVhYWQiLCJyb2xlIjoidXNlciIsImlhdCI6MTcwOTAxNjM3MywiZXhwIjoxNzExNjA4MzczfQ.kuJEQqHPLARdCtHU9HA7UYFZJhG2qjfpbA1nDLY88YE'

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios.delete(process.env.NEXT_PUBLIC_API_HOST + '/settings/' + sid)
      const data = await response.data;
      if (data?.message) {
        toast.success(data?.message)
        setLoading(false)
      } else {
        toast.error(data?.message)
      }
    } catch (error) {
      toast.warning(error?.message)
    }
  }
  return (
    <Link href="/admin/amount/edit" title="Edit" className="font-medium text-blue-600 dark:text-blue-500 hover:underline"><FaEdit /></Link>

  )
}

export default UpdateSetup