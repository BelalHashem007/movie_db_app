import { supabase } from "./setup";

async function createAccount(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: email.split("@")[0],
        },
      },
    });
    return { data, error };
  } catch (err) {
    console.error(err);
    return { data: null, error: { message: "Something went wrong!" } };
  }
}

function signInListener(callback: (userid: string | undefined) => void) {
  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_IN") callback(session?.user.id);
  });
  return data.subscription.unsubscribe;
}

async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    return { error };
  } catch (err) {
    console.error(err);
    return { error: { message: "Something went wrong!" } };
  }
}

async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  } catch (err) {
    console.error(err);
    return {
      data: { session: null, user: null },
      error: { message: "Something went wrong!" },
    };
  }
}

export { createAccount, signInListener, signOut, signIn };
