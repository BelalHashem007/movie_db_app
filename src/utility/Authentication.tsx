import { useEffect } from "react";
import { useAppDispatch } from "../app/hooks";
import { setAuthState, setUser } from "../app/authSlice/authSlice";
import { signInListener } from "../supabase/auth";
import { fetchUser } from "../supabase/db";

export default function Authentication({
  children,
}: {
  children: React.ReactElement;
}) {
  const dispatch = useAppDispatch();
  //get auth state
  useEffect(() => {
    const checkAuthentication = async (userid: string | undefined) => {
      if (typeof userid === "undefined") dispatch(setAuthState(false));
      else {
        dispatch(setUser(await fetchUser(userid)));
        dispatch(setAuthState(true));
      }
    };
    const unsubscribe = signInListener(checkAuthentication);

    return () => unsubscribe();
  }, [dispatch]);

  return children;
}
