import { supabase } from "./supabaseClient";

/**
 * Sign in with Google using Supabase OAuth.
 */
export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });

  if (error) {
    console.error("Google Sign-in Error:", error.message);
    return { success: false, error };
  }

  return { success: true, data };
}

/**
 * Sign out the current user.
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Sign Out Error:", error.message);
    return { success: false, error };
  }
  return { success: true };
}

/**
 * Get the current session of the user.
 */
export async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error("Session Error:", error.message);
    return { success: false, error };
  }
  return { success: true, session: data.session || null };
}

/**
 * Get the user details from the current session.
 */
export async function getUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error("Get User Error:", error.message);
    return { success: false, error };
  }
  return { success: true, user: data.user || null };
}
