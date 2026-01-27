import { createSlice,type PayloadAction } from "@reduxjs/toolkit";
import { type Tables } from "../../supabase/supabase";

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
});

export const {initializeWatchListState} = watchListSlice.actions
export default watchListSlice;
