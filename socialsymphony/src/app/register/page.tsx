"use client";

import { signInWithGoogle } from "@/app/utils/authUtils";

export default function RegisterPage() {
  const handleGoogleRegister = async () => {
    const { success, error } = await signInWithGoogle();
    if (!success) {
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="container text-center mt-5">
      <h1>Register</h1>
      <p>Create your account using Google.</p>
      <button className="btn btn-register" onClick={handleGoogleRegister}>
        Register with Google
      </button>
    </div>
  );
}
