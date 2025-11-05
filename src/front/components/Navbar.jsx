import React, { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import "../css/LoveIslandNavbar.css";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { getLoggedInUser, logoutUser } from "../assets/Users.js";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { store, dispatch } = useGlobalReducer();
  const { auth } = store;

  
  useEffect(() => {
    if (!auth.isAuthenticated) {
      getLoggedInUser(dispatch);
    }
  }, [auth.isAuthenticated, dispatch]);

  const handleLogout = () => {
    logoutUser(dispatch);
    Navigate("/");
  };

  const navItems = [
    { label: "Voting", to: "/voting" },
    { label: "Islanders", to: "/islanders" },
    { label: "Leaderboard", to: "/leaderboard" },
  ];

  return (
    <>
      <header className="love-navbar">
        <div className="inner">
          <Link to="/" className="brand">
            <span className="badge">💗</span>
            <span>Love Island</span>
          </Link>

          <nav>
            {navItems.map((item) => (
              <Link key={item.label} to={item.to}>
                {item.label}
              </Link>
            ))}

            {auth.isAuthenticated && auth.user ? (
              <div className="welcome-section">
                <span className="welcome-text">
                  Welcome, {auth.user.username}! 💕
                </span>
                <button
                  className="btn btn-link logout-btn"
                  onClick={handleLogout}
                  style={{
                    marginLeft: "10px",
                    color: "#6f0d2eff",
                    textDecoration: "none",
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/signuplogin" className="cta">
                Sign In / Log In
              </Link>
            )}
          </nav>
        </div>
      </header>
      <div className="love-navbar-spacer" />
    </>
  );
}




// import React, { useState, useRef, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "../css/LoveIslandNavbar.css";


// export default function Navbar() {
// const navItems = [
// { label: "Voting", to: "/voting" },
// { label: "Islanders", to: "/islanders" },
// { label: "Leaderboard", to: "/leaderboard" },
// ];


// return (
// <>
// <header className="love-navbar">
// <div className="inner">
// <Link to="/" className="brand">
// <span className="badge">💗</span>
// <span>Love Island</span>
// </Link>


// <nav>
// {navItems.map((item) => (
// <Link key={item.label} to={item.to}>{item.label}</Link>
// ))}
// <Link to="/signuplogin" className="cta">Sign In / Log In</Link>
// </nav>
// </div>
// </header>
// <div className="love-navbar-spacer" />
// </>
// );
// }