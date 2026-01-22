import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Database } from "../../supabase/supabase";
import type { RootState } from "../store";

export type User = Database["public"]["Tables"]["users"]["Row"];

interface Auth {
    token:string
    authenticationState: boolean
    user: User | null
}
const initialState:Auth = {token:'',authenticationState:false, user:null}
const authSlice = createSlice({ name: "auth", initialState, reducers: {
    initializeToken : (state)=>{
        state.token = import.meta.env.VITE_API_TOKEN
    },
    setAuthState : (state,action: PayloadAction<boolean>)=> {
        state.authenticationState = action.payload;
    },
    setUser : (state,action: PayloadAction<User | null>)=>{
        state.user = action.payload;
    }
} });


export const selectCurrentUser = (state:RootState)=> state.auth.user

export const {initializeToken,setAuthState,setUser} = authSlice.actions;
export default authSlice;
