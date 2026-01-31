import { createSlice, type PayloadAction, isAnyOf } from "@reduxjs/toolkit";
import { type Tables } from "../../supabase/supabase";
import movieApi from "../apiSlice";
import { userLoggedOut } from "../authSlice/authSlice";
import type { AppStartListener } from "../listenerMiddleware";

//types
export type WatchlistPayloadItem = Pick<
  Tables<"watchlist">,
  "movie_id" | "title" | "img" | "rate" | "date" | "overview"
>;

type WatchListState = {
  ids: number[];
  map: { [key: string]: WatchlistPayloadItem };
};

//listeners
export const deleteWatchlistListener = (
  startAppListening: AppStartListener,
) => {
  startAppListening({
    matcher: isAnyOf(
      movieApi.endpoints.deleteWatchlistItem.matchFulfilled,
      movieApi.endpoints.deleteWatchlistItem.matchRejected,
    ),
    effect: async (action) => {
        const { toast } = await import("react-hot-toast");
        if (movieApi.endpoints.deleteWatchlistItem.matchFulfilled(action))
            toast.success("Movie has been removed from watchlist!");
        else if (movieApi.endpoints.deleteWatchlistItem.matchRejected(action))
            toast.error("Something went wrong! Try again please.");
    },
  });
};

export const addWatchlistListener = (
  startAppListening: AppStartListener,
) => {
  startAppListening({
    matcher: isAnyOf(
      movieApi.endpoints.addWatchlistItem.matchFulfilled,
      movieApi.endpoints.addWatchlistItem.matchRejected,
    ),
    effect: async (action) => {
        const { toast } = await import("react-hot-toast");
        if (movieApi.endpoints.addWatchlistItem.matchFulfilled(action))
            toast.success("Movie has been added to watchlist!");
        else if (movieApi.endpoints.addWatchlistItem.matchRejected(action))
            toast.error("Something went wrong! Try again please.");
    },
  });
};

//initial state
const initialState: WatchListState = {
  ids: [],
  map: {},
};

//slice creation
const watchListSlice = createSlice({
  name: "watchList",
  initialState: initialState,
  reducers: {
    initializeWatchListState: (
      state,
      action: PayloadAction<WatchlistPayloadItem[]>,
    ) => {
      for (let i = 0; i < action.payload.length; i++) {
        state.ids.push(action.payload[i].movie_id);
        state.map[action.payload[i].movie_id.toString()] = action.payload[i];
      }
    },
  },
  extraReducers: (builder) => {
    //logout stuff
    builder.addCase(userLoggedOut, (state) => {
      state.ids = [];
      state.map = {};
    });
    //watchlist stuff
    builder
      .addMatcher(
        movieApi.endpoints.deleteWatchlistItem.matchFulfilled,
        (state, action) => {
          state.ids = state.ids.filter((id) => id !== action.payload);
        },
      )
      .addMatcher(
        movieApi.endpoints.addWatchlistItem.matchFulfilled,
        (state, action) => {
          state.ids.unshift(action.payload.movie_id);
          state.map[action.payload.movie_id.toString()] = action.payload;
        },
      );
  },
});

export const { initializeWatchListState } = watchListSlice.actions;
export default watchListSlice;
