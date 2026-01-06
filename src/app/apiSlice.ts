import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "./store";
import type { Movie } from "../components/Movie";

type MovieResponse = {
  title: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
  id: string;
};

interface ApiResponse {
  results: MovieResponse[];
  total_pages:string
}

interface FilteredResponse {
  results: Movie[]
  total_pages: string
}

const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAuthentication: builder.query<object, void>({
      query: () => "authentication",
    }),
    getPopularMovies: builder.query<FilteredResponse, string | number>({
      query: (page) =>
        `discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`,
      transformResponse(res: ApiResponse) {
        const results: Movie[] = res.results.map((res) => ({
          id: res.id,
          title: res.title,
          img_url: res.poster_path,
          release_date: res.release_date,
          vote_average: res.vote_average,
        }));
        return {total_pages:res.total_pages,results}
      },
    }),
  }),
});

export const { useGetAuthenticationQuery, useGetPopularMoviesQuery } = movieApi;
export default movieApi;
