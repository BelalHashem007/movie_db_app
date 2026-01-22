import { supabase } from "./setup";
import type { User } from "../app/authSlice/authSlice";

async function fetchUser(userid:string): Promise<User | null>{
    const {data,error} = await supabase.from("users").select().eq("id",userid).maybeSingle();
    if (error) console.error(error)
    return data;
}

export {fetchUser}