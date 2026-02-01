import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice/authSlice";
import movieApi from "./apiSlice";
import imageSlice from "./imageSlice/imageSlice";
import { listenerMiddlware } from "./listenerMiddleware";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    [movieApi.reducerPath]: movieApi.reducer,
    img:imageSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddlware.middleware).concat(movieApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
