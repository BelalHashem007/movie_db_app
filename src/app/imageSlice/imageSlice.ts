import { createSlice } from "@reduxjs/toolkit";

const imageSlice = createSlice({
  name: "image",
  initialState: {url:"https://image.tmdb.org/t/p/"},
  reducers: {},
});

export default imageSlice;
