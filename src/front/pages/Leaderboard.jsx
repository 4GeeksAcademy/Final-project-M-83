import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { actions } from "../assets/islanders.js";
import { ContestantGrid } from "../components/Contestant_card.jsx";
import "../css/leaderboard.css";

export const Leaderboard = () => {
  const { store } = useGlobalReducer();
  const [islanders, setIslanders] = useState([]);
  const [filter, setFilter] = useState("all"); // "all", "female", "male"

  // Load islanders on mount
  useEffect(() => {
    const fetchData = async () => {
      const data = await actions.getAllIslanders(store, setIslanders, () => {}, () => {});
      if (data) setIslanders(data);
    };
    fetchData();
  }, [store]);

  // Filter by gender if needed
  const filteredIslanders = islanders.filter((i) => {
    if (filter === "female") return i.gender === "Female";
    if (filter === "male") return i.gender === "Male";
    return true;
  });

  // Sort by votes (descending)
  const sortedIslanders = [...filteredIslanders].sort((a, b) => b.votes - a.votes);

  return (
    <main className="leaderboard-page container py-4">
      {/* Title Section */}
      <section className="leaderboard-hero mb-3">
        <h1 className="leaderboard-title">🏝️ Love Island Leaderboard</h1>
        <p className="leaderboard-sub">Who’s capturing hearts this week?</p>
      </section>

      {/* Filter Buttons */}
      <div className="text-center">
        <div className="segmented">
          <button
            className={`segmented-btn ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`segmented-btn ${filter === "female" ? "active" : ""}`}
            onClick={() => setFilter("female")}
          >
            Girls
          </button>
          <button
            className={`segmented-btn ${filter === "male" ? "active" : ""}`}
            onClick={() => setFilter("male")}
          >
            Boys
          </button>
        </div>
      </div>

      {/* Contestant Grid */}
      <section className="leaderboard-grid-wrap">
        {sortedIslanders.length > 0 ? (
          <ContestantGrid
            list={sortedIslanders}
            showVotes={true}
            hideVoteButton={true}
          />
        ) : (
          <p className="text-center text-white mt-4">
            No contestants available yet — check back soon!
          </p>
        )}
      </section>
    </main>
  );
};