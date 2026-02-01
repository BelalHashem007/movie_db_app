import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "./store";
import type { Movie } from "../components/Movie";
import { isApiResponse } from "../utility/helperFunctions";
import { supabase } from "../supabase/setup";
import type { Tables } from "../supabase/supabase";
import type {  AppStartListener } from "./listenerMiddleware";
import { isAnyOf } from "@reduxjs/toolkit";

//     3rd party api types
//---------------------------------
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
  };
  content: string;
  created_at: string;
  id: string;
};

type MovieReviews = {
  id: number;
  page: number;
  results: Review[];
};

//          supa db types
//---------------------------------
export type MovieToWatchlist = Omit<
  Tables<"watchlist">,
  "created_at" | "id" | "user_id"
>;

export type MovieToWatchlistWithUserID = MovieToWatchlist & { user_id: string };

//          Api Slice
//---------------------------------
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
    //       TMDB API Endpoints
    //--------------------------------
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
    getMovieReviewsById: builder.query<MovieReviews, string | number>({
      query: (id) => `movie/${id}/reviews?language=en-US&page=1`,
    }),
    getMovieRecommendation: builder.query<FilteredResponse, number | string>({
      query: (id) => `movie/${id}/recommendations?language=en-US&page=1`,
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
    //           Supabase SDK
    //-----------------------------------
    //--WatchList
    getAllWatchlist: builder.query<MovieToWatchlist[], string>({
      queryFn: async (user_id) => {
        const { data, error } = await supabase
          .from("watchlist")
          .select("movie_id,title,img,rate,date,overview")
          .eq("user_id", user_id);
        if (error) return { error: { data: null, status: 500, error } };
        return { data };
      },
    }),
    deleteWatchlistItem: builder.mutation< number,{ movie_id: number; user_id: string }>({
      queryFn: async ({ movie_id, user_id }) => {
        const { error } = await supabase
          .from("watchlist")
          .delete()
          .eq("movie_id", movie_id)
          .eq("user_id", user_id);
        if (error)
          return {
            error: { data: null, status: 500, error: error },
          };
        return { data: movie_id };
      },
      async onQueryStarted(
        { movie_id, user_id },
        { dispatch, queryFulfilled },
      ) {
        const patchResult = dispatch(
          movieApi.util.updateQueryData("getAllWatchlist", user_id, (draft) => {
            return draft.filter((item) => item.movie_id != movie_id);
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    addWatchlistItem: builder.mutation<MovieToWatchlistWithUserID,MovieToWatchlistWithUserID>({
      queryFn: async (movieData) => {
        const { error } = await supabase.from("watchlist").insert({
          date: movieData.date,
          img: movieData.img,
          movie_id: movieData.movie_id,
          title: movieData.title,
          rate: movieData.rate,
          overview: movieData.overview,
          user_id: movieData.user_id,
        });

        if (error) return { error: { data: null, status: 500, error: error } };
        else return { data: movieData };
      },
      async onQueryStarted(movieData, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          movieApi.util.updateQueryData(
            "getAllWatchlist",
            movieData.user_id,
            (draft) => {
              draft.unshift({
                date: movieData.date,
                img: movieData.img,
                movie_id: movieData.movie_id,
                title: movieData.title,
                rate: movieData.rate,
                overview: movieData.overview,
              });
            },
          ),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

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

export const {
  useGetMovieListsQuery,
  useGetMovieByIdQuery,
  useGetMovieReviewsByIdQuery,
  useGetMovieRecommendationQuery,
  useDeleteWatchlistItemMutation,
  useAddWatchlistItemMutation,
  useGetAllWatchlistQuery,
} = movieApi;
export default movieApi;
