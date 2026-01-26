import { createSlice,type PayloadAction } from "@reduxjs/toolkit";
import { type Tables } from "../../supabase/supabase";

type WatchListState = {
    [key:string]: boolean
}

const initialState: WatchListState = {};

const watchListSlice = createSlice({
  name: "watchList",
  initialState: initialState,
  reducers: {
    initializeState: (state,action:PayloadAction<Tables<'watchlist'>[]>)=>{
        for (let i = 0; i < action.payload.length; i++) {
            state[action.payload[i].movie_id.toString()] = true;
        }
    }
  },
});

export const {initializeState} = watchListSlice.actions
export default watchListSlice;
