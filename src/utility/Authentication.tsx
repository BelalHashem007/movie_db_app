import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  userLoggedIn,
  userLoggedOut,
  selectCurrentUserId,
} from "../app/authSlice/authSlice";
import { supabase } from "../supabase/setup";

export default function Authentication({
  children,
}: {
  children: React.ReactElement;
}) {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectCurrentUserId);
  //get auth state
  useEffect(() => {
    supabase.auth.getSession().then((obj)=>{
      if (obj.data.session)
        dispatch(userLoggedIn(obj.data.session.user.id))
      else dispatch(userLoggedOut())
    });

    const {data: {subscription}} = supabase.auth.onAuthStateChange((_,session)=>{
      if (session?.user)
        dispatch(userLoggedIn(session.user.id))
      else 
        dispatch(userLoggedOut())
    })

    return () => subscription.unsubscribe();
  }, [dispatch, userId]);

  return children;
}
