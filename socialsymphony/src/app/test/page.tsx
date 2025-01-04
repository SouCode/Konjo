"use client";

import React, { useEffect, useState } from "react";
import { getSession, signOut } from "@/app/utils/authUtils";
import OnboardingWidget from "@/app/widgets/onboardingWidget/onboardingWidget";
import { User } from "@supabase/supabase-js";

export default function TestPage() {
  const [user, setUser] = useState<User | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(true);

  useEffect(() => {
    async function fetchSession() {
      const { success, session } = await getSession();
      if (success && session) {
        setUser(session.user);
      }
    }

    fetchSession();
  }, []);

  const handleSignOut = async () => {
    const { success } = await signOut();
    if (success) {
      setUser(null);
      alert("You have been logged out successfully.");
    } else {
      alert("Logout failed. Please try again.");
    }
  };

  const handleOnboardingComplete = (selectedGenres: string[], selectedArtists: string[]) => {
    console.log("User selected genres:", selectedGenres);
    console.log("User selected artists:", selectedArtists);
    setShowOnboarding(false);
  };
  

  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <a className="navbar-brand ms-n3" href="#">
            [Konjo]---&gt;
          </a>
          <div>
            {user ? (
              <>
                <span>Welcome, {user.email}</span>
                <button className="btn btn-login ms-2" onClick={handleSignOut}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <a href="/register" className="btn btn-register me-2">
                  Register
                </a>
                <a href="/login" className="btn btn-login">
                  Login
                </a>
              </>
            )}
          </div>
        </div>
      </nav>

      <div style={{ position: "relative", width: "100%", height: "100vh" }}>
        {user ? (
          <>
            {showOnboarding && (
              <OnboardingWidget onComplete={handleOnboardingComplete} />
            )}
          </>
        ) : (
          <h1>Please log in to access the platform.</h1>
        )}
      </div>
    </div>
  );
}
