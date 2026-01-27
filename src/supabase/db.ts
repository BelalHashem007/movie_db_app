import { supabase } from "./setup";
import type { User } from "../app/authSlice/authSlice";

export type MovieToAdd = {
  movieid: number;
  title: string;
  img: string;
  userid: string;
  rating: number;
  date: string;
  overview: string;
};
// user table stuff
async function fetchUser(userid: string): Promise<User | null> {
  const { data, error } = await supabase
    .from("users")
    .select()
    .eq("id", userid)
    .maybeSingle();
  if (error) console.error(error);
  return data;
}


// watchlist table stuff
async function addMovieToWatchlist({
  img,
  movieid,
  title,
  userid,
  date,
  rating,
  overview,
}: MovieToAdd) {
  try {
    const { error } = await supabase
      .from("watchlist")
      .insert({
        movie_id: movieid,
        user_id: userid,
        img,
        title,
        date,
        overview,
        rate: rating,
      });
    return { error };
  } catch (err) {
    console.error(err);
    return { error: { message: "Something went wrong!" } };
  }
}

async function getAllWatchlistMovieId(userid: string) {
  const { data, error } = await supabase
    .from("watchlist")
    .select('movie_id,title,img,rate,date,overview')
    .eq("user_id", userid);
  if (error) {
    console.error(error);
  }
  return {data,error};
}

export { fetchUser, addMovieToWatchlist,getAllWatchlistMovieId };
