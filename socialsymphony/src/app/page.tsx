"use client";

import { useEffect, useState } from "react";
import { getSession, signOut } from "@/app/utils/authUtils";
import ChatWidget from "@/app/widgets/chatWidget/chatWidget";
import { User } from "@supabase/supabase-js";

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null);

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

      <div className="container mt-5">
        {user ? (
          <>
            <ChatWidget />
          </>
        ) : (
          <h1>Please log in to access the community chat.</h1>
        )}
      </div>
    </div>
  );
}
