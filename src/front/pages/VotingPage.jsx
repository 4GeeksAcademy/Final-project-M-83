import React, { useEffect, useState,useCallback } from "react";
import  useGlobalReducer  from "../hooks/useGlobalReducer.jsx";
import { actions } from "../assets/islanders.js";
import { ContestantGrid } from "../components/Contestant_card.jsx";
import "../css/voting-page.css";

export const VotingPage = () => {     // 👈 named export
  const { store, dispatch } = useGlobalReducer();
  
  const [islanders, setIslanderData] = useState([]);
  const [femaleContestants, setFemaleContestants] = useState([]);
  const [maleContestants, setMaleContestants] = useState([]);

  useEffect(() => {
    actions.getAllIslanders(
      store,
      setIslanderData,
      setFemaleContestants,
      setMaleContestants
    );
  }, []);

  const handleVote = useCallback(
    async(islander)=> {
    const ok = await actions.voteIslander(store, dispatch, islander);
    return ok;
  },
  [store, dispatch]
);

  const hasData = Array.isArray(islanders) && islanders.length > 0;

  return (
    <main className="voting-page">
      {/* Hero */}
      <section className="voting-hero">
        <h2 className="tagline">VOTE FOR LOVE</h2>
        <h1 className="headline">VOTE FOR YOUR FAVORITE CONTESTANT</h1>
      </section>

      {/* Optional little status line (helpful while wiring things up) */}
      {!hasData && (
        <p style={{ color: "#fff", marginBottom: 24 }}>
          No contestants loaded yet. Make sure your backend is running and{" "}
          <code>VITE_BACKEND_URL</code> ends with <code>/api/</code>. If your DB is empty,
          open the Home page once to seed islanders.
        </p>
      )}

      {/* Grid */}
      <section className="voting-grid-wrap">
        <ContestantGrid list={islanders} onVote={handleVote} showVotes />
      </section>
    </main>
  );
};

