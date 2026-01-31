import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  userLoggedIn,
  userLoggedOut,
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
        dispatch(userLoggedOut())
      } else if (user?.id !== userid) {
        dispatch(userLoggedIn(await fetchUser(userid)));
      }
    };
    const unsubscribe = signInListener(checkAuthentication);

    return () => unsubscribe();
  }, [dispatch, user?.id]);

  return children;
}
