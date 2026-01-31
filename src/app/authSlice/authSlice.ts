import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Tables } from "../../supabase/supabase";
import type { RootState } from "../store";

export type User = Tables<"users">;

interface Auth {
  token: string;
  authenticationState: boolean;
  user: User | null;
}
const initialState: Auth = {
  token: "",
  authenticationState: false,
  user: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    initializeToken: (state) => {
      state.token = import.meta.env.VITE_API_TOKEN;
    },
    userLoggedIn: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    userLoggedOut: (state)=>{
        state.user = null;
    }
  }
});

export const selectCurrentUser = (state: RootState) => state.auth.user;

export const { initializeToken, userLoggedIn,userLoggedOut } = authSlice.actions;
export default authSlice;
