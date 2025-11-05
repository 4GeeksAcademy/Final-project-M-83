import React, { useEffect, useState, useCallback, useMemo } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { actions } from "../assets/islanders.js";
import { ContestantGrid } from "../components/Contestant_card.jsx";
import "../css/voting-page.css";

export const VotingPage = () => {
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
  }, [store.baseUrl]);

  const handleVote = useCallback(
    async (islander) => {
      const ok = await actions.voteIslander(store, dispatch, islander);
      if (ok) {
        // keep local list in sync without changing order
        setIslanderData(prev =>
          Array.isArray(prev)
            ? prev.map(p => (p.id === islander.id ? { ...p, votes: (p.votes || 0) + 1 } : p))
            : prev
        );
      }
      return ok;
    },
    [store, dispatch]
  );

  // ✅ Enforce a stable order (pick one):
  // A) by numeric id (common + stable)
  const stableList = useMemo(
    () => [...(islanders || [])].sort((a, b) => (a.id ?? 0) - (b.id ?? 0)),
    [islanders]
  );
  // B) or by name:
  // const stableList = useMemo(
  //   () => [...(islanders || [])].sort((a, b) => (a.name || "").localeCompare(b.name || "")),
  //   [islanders]
  // );

  const hasData = Array.isArray(stableList) && stableList.length > 0;

  return (
    <main className="voting-page">
      <section className="voting-hero">
        <h2 className="tagline">VOTE FOR LOVE</h2>
        <h1 className="headline">VOTE FOR YOUR FAVORITE CONTESTANT</h1>
      </section>

      {!hasData && (
        <p style={{ color: "#fff", marginBottom: 24 }}>
          No contestants loaded yet. Make sure your backend is running and{" "}
          <code>VITE_BACKEND_URL</code> ends with <code>/api/</code>. If your DB is empty,
          open the Home page once to seed islanders.
        </p>
      )}

      <section className="voting-grid-wrap">
        <ContestantGrid
          list={stableList}
          onVote={handleVote}
          showVotes={false}
          hideVoteButton={false}
        />
      </section>
    </main>
  );
};
