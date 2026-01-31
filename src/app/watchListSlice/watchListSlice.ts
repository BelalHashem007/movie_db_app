import { createSlice,type PayloadAction } from "@reduxjs/toolkit";
import { type Tables } from "../../supabase/supabase";
import movieApi from "../apiSlice";
import { userLoggedOut } from "../authSlice/authSlice";

export type WatchlistPayloadItem = Pick<Tables<'watchlist'>,'movie_id' | 'title' | 'img' | 'rate' | 'date' | 'overview'>;

type WatchListState = {
    ids : number[],
    map : {[key:string]: WatchlistPayloadItem}
}

const initialState: WatchListState = {
    ids: [],
    map: {}
};

const watchListSlice = createSlice({
  name: "watchList",
  initialState: initialState,
  reducers: {
    initializeWatchListState: (state,action:PayloadAction<WatchlistPayloadItem[]>)=>{
        for (let i = 0; i < action.payload.length; i++) {
            state.ids.push(action.payload[i].movie_id);
            state.map[action.payload[i].movie_id.toString()] = action.payload[i];
        }
    }
  },
  extraReducers: (builder)=>{
    //logout stuff
    builder.addCase(userLoggedOut,(state)=>{
        state.ids = [];
        state.map = {};
    })
    //watchlist stuff
    builder.addMatcher(movieApi.endpoints.deleteWatchlistItem.matchFulfilled, (state,action)=>{
        state.ids = state.ids.filter(id => id !== action.payload)
    }).addMatcher(movieApi.endpoints.addWatchlistItem.matchFulfilled, (state,action)=>{
        state.ids.unshift(action.payload.movie_id);
        state.map[action.payload.movie_id.toString()] = action.payload;
    })
  }
});

export const {initializeWatchListState} = watchListSlice.actions
export default watchListSlice;
