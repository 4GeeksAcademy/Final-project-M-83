import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/LoveIslandNavbar.css";


export default function Navbar() {
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
<Link key={item.label} to={item.to}>{item.label}</Link>
))}
<Link to="/signuplogin" className="cta">Sign In / Log In</Link>
</nav>
</div>
</header>
<div className="love-navbar-spacer" />
</>
);
}