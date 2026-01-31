import { supabase } from "./setup";
import type { User } from "../app/authSlice/authSlice";

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

export { fetchUser,getAllWatchlistMovieId };
