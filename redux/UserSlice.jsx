"use client"
import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name:"User",
    initialState:[],
    reducers:{
        add(state,action){
            state.push(action.payload)
        },
        remove(state,action){
            
        }
    }
})