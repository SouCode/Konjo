"use client";

import { useEffect, useState } from "react";
import { getSession, signOut } from "@/app/utils/authUtils";
import { Session, User } from "@supabase/supabase-js"; // Import User type

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null); // Explicitly type the state

  useEffect(() => {
    async function fetchSession() {
      const { success, session } = await getSession();
      if (success && session) {
        setUser(session.user); // Assign session.user (type User)
      }
    }
    fetchSession();
  }, []);

  const handleLogout = async () => {
    const { success } = await signOut();
    if (success) {
      setUser(null); // Reset state after logout
      alert("You have been logged out.");
    } else {
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          {/* Brand */}
          <a className="navbar-brand ms-n3" href="#">
            [Konjo]---&gt;
          </a>
          {/* User Actions */}
          <div>
            {user ? (
              <>
                <span className="text-white me-3">
                  Welcome, {user.email || "User"}
                </span>
                <button className="btn btn-login" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <a href="/register">
                  <button className="btn btn-register me-2">Register</button>
                </a>
                <a href="/login">
                  <button className="btn btn-login">Login</button>
                </a>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
