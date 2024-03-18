"use client"

import { useState } from "react";
import axios from "axios"
import { toast } from "sonner";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { RiDeleteBin6Fill } from "react-icons/ri";

const DeleteSetup = ({id,onSetSetting}) => {
    const Finalid = id
    const[loading,setLoading] = useState(false)
    
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
              const token = localStorage.getItem("JWTtoken")
              axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
              const response = await axios.delete(process.env.NEXT_PUBLIC_API_HOST + '/settings/'+sid)
              const data = await response.data;
              if (data?.success == true) {
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
    <a href="#" title="Delete" className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3" onClick={(e) => handleDelete(id)}>{loading? "Deleting..." : <RiDeleteBin6Fill />}</a>
  )
}

export default DeleteSetup