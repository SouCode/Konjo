"use client";

import { signInWithGoogle } from "@/app/utils/authUtils";

export default function LoginPage() {
  const handleGoogleLogin = async () => {
    const { success, error } = await signInWithGoogle();
    if (!success) {
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="container text-center mt-5">
      <h1>Login</h1>
      <p>Sign in to your account using Google.</p>
      <button className="btn btn-login" onClick={handleGoogleLogin}>
        Login with Google
      </button>
    </div>
  );
}
