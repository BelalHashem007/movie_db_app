import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "./store";
import type { Movie } from "../components/Movie";
import { isApiResponse } from "../utility/helperFunctions";
import { supabase } from "../supabase/setup";

type MovieResponse = {
  title: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
  id: string;
};

export interface ApiResponse {
  results: MovieResponse[];
  total_pages: string;
}

interface FilteredResponse {
  results: Movie[];
  total_pages: string;
}

export type Category = "top_rated" | "popular" | "now_playing" | "upcoming";

interface GetMovieListsArgument {
  page: number | string;
  category: Category;
}

type Genre = { id: number; name: string };

type Cast = {
  id: number;
  profile_path: string;
  name: string;
  character: string;
};

export type Credits = { cast: Cast[] };

export type Backdrop = {
  file_path: string;
};

export type Images = {
  backdrops: Backdrop[];
};

export interface MovieById extends MovieResponse {
  budget: number;
  genres: Genre[];
  overview: string;
  runtime: number;
  credits: Credits;
  images: Images;
}

export type Review = {
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string;
    rating: string;
  },
  content:string
  created_at:string
  id:string
};

type MovieReviews = {
  id: number;
  page: number;
  results: Review[];
};

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
    getMovieLists: builder.query<FilteredResponse, GetMovieListsArgument>({
      query: ({ page, category }) =>
        `movie/${category}?language=en-US&page=${page}`,
      transformResponse(res: unknown) {
        if (!isApiResponse(res)) {
          throw new Error("Invalid API Response");
        }
        const results: Movie[] = res.results.map((res) => ({
          id: res.id,
          title: res.title,
          img_url: res.poster_path,
          release_date: res.release_date,
          vote_average: res.vote_average,
        }));
        return { total_pages: res.total_pages, results };
      },
    }),
    getMovieById: builder.query<MovieById, string | number>({
      query: (id) =>
        `movie/${id}?append_to_response=credits,images&language=en-US&include_image_language=en-US,null`,
    }),
    getMovieReviewsById: builder.query<MovieReviews,string|number>({
      query: (id)=> `movie/${id}/reviews?language=en-US&page=1`
    }),
    getMovieRecommendation: builder.query<FilteredResponse,number|string>({
      query: (id)=> `movie/${id}/recommendations?language=en-US&page=1`,
      transformResponse(res: unknown) {
        if (!isApiResponse(res)) {
          throw new Error("Invalid API Response");
        }
        const results: Movie[] = res.results.map((res) => ({
          id: res.id,
          title: res.title,
          img_url: res.poster_path,
          release_date: res.release_date,
          vote_average: res.vote_average,
        }));
        return { total_pages: res.total_pages, results };
      },
    }),
    deleteWatchlistItem: builder.mutation<number,{movie_id:number, user_id:string}>({
    queryFn : async ({movie_id,user_id})=>{
      const {error} =  await supabase
      .from("watchlist")
      .delete()
      .eq("movie_id", movie_id)
      .eq("user_id", user_id);
      if (error) return {
        error: {data:null,status:500,error:error}
      }
      return {data: movie_id}
    }
  })
  }),
  
});

export const {
  useGetMovieListsQuery,
  useGetMovieByIdQuery,
  useGetMovieReviewsByIdQuery,
  useGetMovieRecommendationQuery,
  useDeleteWatchlistItemMutation
} = movieApi;
export default movieApi;
