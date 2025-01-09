"use client";

import React, { useEffect, useState } from "react";
import { getSession, signOut } from "@/app/utils/authUtils";
import { supabase } from "@/app/utils/supabaseClient";
import OnboardingWidget from "@/app/widgets/onboardingWidget/onboardingWidget";
import ProfileWidget from "@/app/widgets/profileWidget/profileWidget";
import { User } from "@supabase/supabase-js";

export default function TestPage() {
  const [user, setUser] = useState<User | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [preferences, setPreferences] = useState<{ genres: string[]; artists: string[] } | null>(null);

  useEffect(() => {
    async function fetchSession() {
      const { success, session } = await getSession();
      if (success && session) {
        setUser(session.user);
        checkOnboardingStatus(session.user.id);
      }
    }

    fetchSession();
  }, []);

  const checkOnboardingStatus = async (userId: string) => {
    const { data, error } = await supabase
      .from("user_preferences")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (!error && data) {
      setPreferences({ genres: data.genres, artists: data.artists });
      setShowOnboarding(false); // User has already completed onboarding
    } else {
      setShowOnboarding(true); // Show onboarding for new users
    }
  };

  const handleOnboardingComplete = async (selectedGenres: string[], selectedArtists: string[]) => {
    if (user) {
      const { error } = await supabase.from("user_preferences").insert({
        user_id: user.id,
        genres: selectedGenres,
        artists: selectedArtists,
      });

      if (error) {
        console.error("Error saving preferences:", error.message);
        alert("Failed to save preferences. Please try again.");
      } else {
        alert("Preferences saved successfully!");
        setPreferences({ genres: selectedGenres, artists: selectedArtists });
        setShowOnboarding(false);
      }
    }
  };

  const handleSignOut = async () => {
    const { success } = await signOut();
    if (success) {
      setUser(null);
      alert("You have been logged out successfully.");
    } else {
      alert("Logout failed. Please try again.");
    }
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
            {showOnboarding ? (
              <OnboardingWidget onComplete={handleOnboardingComplete} />
            ) : (
              <ProfileWidget genres={preferences?.genres || []} artists={preferences?.artists || []} />
            )}
          </>
        ) : (
          <h1>Please log in to access the platform.</h1>
        )}
      </div>
    </div>
  );
}
