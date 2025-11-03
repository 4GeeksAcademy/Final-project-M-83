import React, { useEffect, useState } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Leaderboard } from "./Leaderboard.jsx";
import {loginUser} from "../assets/Users.js";
import { actions } from "../assets/islanders.js";
import { fphotoUrls, mphotoUrls } from "../assets/photoUrls.js";
import { HomeCarousel } from "../components/HomeCarousel.jsx";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()
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
	  fcontestantslist.forEach((contestant, index) => {
			contestant.photo_url = fphotoUrls[index] || contestant.photo_url;
      contestant.gender = "Female"
		});
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
    mcontestantslist.forEach((contestant, index) => {
			contestant.photo_url = mphotoUrls[index] || contestant.photo_url
      contestant.gender = "Male"
		});
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
      const data = await actions.getAllIslanders(store, setAllIslanders, setFemaleContestants, setMaleContestants);
      if (!data || data.length === 0) {
        console.log("No islanders found, fetching new data...");
        await fetchJsonData();


        await actions.getAllIslanders(store, setAllIslanders, setFemaleContestants, setMaleContestants);
      } else {
        console.log("Islanders already exist in backend ✅");
      }
    };

    init();
  }, []);



	return (
		<div>
       <h1 className="text-center mt-4">Welcome to Love Island Interactive</h1>
      <HomeCarousel />
			<h2>Meet the Girls</h2>
			<div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "0px" }}>
				{femaleContestants.map((girl, index) => (
					<div key={index} style={{ textAlign: "center" }}>
						<img
							src={girl.photo_url}
							alt={girl.name || `Contestant ${index + 1}`}
							width="150"
							height="200"
							style={{ borderRadius: "10px", objectFit: "cover" }}
						/>
						<p>{girl.name || "Unknown"}</p>
						{girl.bombshell && <p style={{ color: "red" }}>💣 Bombshell!</p>}
					</div>
				))}
			</div>
			<h2>Meet the Guys</h2>
			<div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px" }}>
				{maleContestants.map((boy, index) => (
					<div key={index} style={{ textAlign: "center" }}>
						<img
							src={boy.photo_url}
							alt={boy.name || `Contestant ${index + 1}`}
							width="150"
							height="200"
							style={{ borderRadius: "10px", objectFit: "cover" }}
						/>
						<p>{boy.name || "Unknown"}</p>
						{boy.bombshell && <p style={{ color: "red" }}>💣 Bombshell!</p>}
					</div>
				))}
			</div>

			
		</div>
	);
}; 

  
