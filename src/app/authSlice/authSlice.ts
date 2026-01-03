import { createSlice } from "@reduxjs/toolkit";

interface Auth {
    token:string
}
const initialState:Auth = {token:''}
const authSlice = createSlice({ name: "auth", initialState, reducers: {
    initializeToken : (state)=>{
        state.token = import.meta.env.VITE_API_TOKEN
    }
} });

export const {initializeToken} = authSlice.actions;
export default authSlice;
