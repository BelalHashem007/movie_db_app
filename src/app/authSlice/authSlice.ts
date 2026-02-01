import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface Auth {
  userId: string | null;
}
const initialState: Auth = {
  userId: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action: PayloadAction<string | null>) => {
      state.userId = action.payload;
    },
    userLoggedOut: (state)=>{
        state.userId = null;
    }
  }
});

export const selectCurrentUserId = (state: RootState) => state.auth.userId;

export const { userLoggedIn,userLoggedOut } = authSlice.actions;
export default authSlice;
