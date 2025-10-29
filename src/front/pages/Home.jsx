import React, { useEffect, useState } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Leaderboard } from "./Leaderboard.jsx";
import { loginUser } from "../components/UserCRUD.jsx";
import { actions } from "../assets/islanders.js";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const [femaleContestants, setFemaleContestants] = useState([]);
  const [maleContestants, setMaleContestants] = useState([]);
  const [allIslanders, setAllIslanders] = useState(null);

  // ---------------------------
  // Helper functions
  // ---------------------------

  const getIslanderGirls = async (girls) => {
    const allSeasonsGirls = girls.bachelor;
    const season23DataGirls = allSeasonsGirls["23"];
    const fcontestantslist = season23DataGirls.contestants.slice(0, 15); // safely get first 15

    // Mark 5 bombshells
    for (let i = 0; i < 5; i++) {
      fcontestantslist[i].bombshell = true;
    }

    // Save to backend one-by-one (await each)
    for (const girl of fcontestantslist) {
      await actions.newIslander(girl, store, dispatch);
    }

    setFemaleContestants(fcontestantslist);
  };

  const getIslanderBoys = async (boys) => {
    const allSeasonsBoys = boys.bachelorette;
    const season14DataBoys = allSeasonsBoys["14"];
    const mcontestantslist = season14DataBoys.contestants.slice(0, 15); // safely get first 15

    // Mark 5 bombshells
    for (let i = 0; i < 5; i++) {
      mcontestantslist[i].bombshell = true;
    }

    // Save to backend one-by-one (await each)
    for (const boy of mcontestantslist) {
      await actions.newIslander(boy, store, dispatch);
    }

    setMaleContestants(mcontestantslist);
  };

  const fetchJsonData = async () => {
    try {
      const response = await fetch("/data.json");
      const data = await response.json();

      // Wait for both functions to finish before continuing
      await getIslanderGirls(data);
      await getIslanderBoys(data);
    } catch (e) {
      console.error("Error getting JSON data!!!!! :", e);
    }
  };

  // ---------------------------
  // Main lifecycle logic
  // ---------------------------

  useEffect(() => {
    const init = async () => {
      // Try to get islanders from backend
      const data = await actions.getAllIslanders(store, setAllIslanders);

      // If empty, fetch from JSON and repopulate
      if (!data || data.length === 0) {
        console.log("No islanders found, fetching new data...");
        await fetchJsonData();

        // Once done, re-fetch so state updates with the new 30 islanders
        await actions.getAllIslanders(store, setAllIslanders);
      } else {
        console.log("Islanders already exist in backend ✅");
      }
    };

    init();
  }, []);

  // Debugging log — only runs when allIslanders updates
  useEffect(() => {
    if (allIslanders) {
      console.log("ALL ISLANDERS TAG!!!!!!!!! :", allIslanders);
    }
  }, [allIslanders]);

  // ---------------------------
  // Render
  // ---------------------------

  return (
    <div className="text-center mt-5">
      <h1>Hello Rigo!</h1>
      <p>
        <img src={rigoImageUrl} alt="rigo-baby" />
      </p>
      <Leaderboard />
    </div>
  );
};
