import { createListenerMiddleware,addListener } from "@reduxjs/toolkit";
import type { RootState,AppDispatch } from "./store";
import { deleteWatchlistListener,addWatchlistListener } from "./apiSlice";

//setup
export const listenerMiddlware = createListenerMiddleware();

export const startAppListener = listenerMiddlware.startListening.withTypes<RootState,AppDispatch>()

export type AppStartListener = typeof startAppListener


export const addAppListener = addListener.withTypes<RootState,AppDispatch>()
export type AppAddListnere = typeof addAppListener


//adding listener
deleteWatchlistListener(startAppListener)
addWatchlistListener(startAppListener)