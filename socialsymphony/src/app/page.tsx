"use client";

import React from "react";

export default function HomePage() {
  return (
    <div>
      {/* Navbar */}
      <nav
        className="navbar navbar-expand-lg"
        style={{ backgroundColor: "#212121" }}
      >
        <div className="container-fluid">
          <a className="navbar-brand text-white" href="#">
            [Konjo]---{">"}
          </a>
          <div className="d-flex">
            <button
              className="btn btn-success me-2"
              style={{ backgroundColor: "#2D9737", border: "none" }}
            >
              Register
            </button>
            <button
              className="btn btn-light"
              style={{ backgroundColor: "#FFFFFF", color: "#000" }}
            >
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* Body */}
      <div
        className="container-fluid"
        style={{
          backgroundColor: "#FFFFFF",
          height: "calc(100vh - 56px)", // Adjust height to fill remaining space
        }}
      ></div>
    </div>
  );
}
