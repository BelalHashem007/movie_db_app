import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  setAuthState,
  setUser,
  selectCurrentUser,
} from "../app/authSlice/authSlice";
import { signInListener } from "../supabase/auth";
import { fetchUser } from "../supabase/db";

export default function Authentication({
  children,
}: {
  children: React.ReactElement;
}) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  //get auth state
  useEffect(() => {
    const checkAuthentication = async (userid: string | undefined) => {
      if (typeof userid === "undefined") {
        dispatch(setUser(null))
        dispatch(setAuthState(false));
      } else if (user?.id !== userid) {
        dispatch(setUser(await fetchUser(userid)));
        dispatch(setAuthState(true));
      }
    };
    const unsubscribe = signInListener(checkAuthentication);

    return () => unsubscribe();
  }, [dispatch, user?.id]);

  return children;
}
