import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Leaderboard } from "./Leaderboard.jsx";
import { loginUser } from "../assets/Users.js";
import { actions } from "../assets/islanders.js";
import { fphotoUrls, mphotoUrls } from "../assets/photoUrls.js";
import { HomeCarousel } from "../components/HomeCarousel.jsx"
import "../css/home-girlsandboys.css"


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
    <div className="container mt-4">
      <div style={{ marginBottom: "2rem" }}>
        <HomeCarousel />
      </div>
      <div className="row">

        {/* Bombshell Column */}
        <div className="col-md-4">
          <div className="bombshellCard p-3 text-center text-white rounded-3">
            <h6 className="fw-bold mb-2">🚨 BOMBSHELL ALERT!</h6>
          </div>
        </div>

         {/* ✅ Girls + Boys */}
        <div className="col-md-8">
          {/* Girls Section */}
          <div className="girlsSection p-3 mb-4 rounded-3">
            <h5 className="fw-bold text-white mb-3">Meet The Girls</h5>
            <div className="li-strip-row">
              {femaleContestants
                .filter(girl => !girl.bombshell) // 👈 exclude bombshells
                  .map((girl, index) => (
                <div className="li-chip" key={girl.id ?? index}>
                  <div className="li-avatar ring-pink">
                    <img
                      src={girl.photo_url}
                      alt={girl.name || `Contestant ${index + 1}`}
                    />
                  </div>
                  <div className="li-name" title={girl.name || "Unknown"}>{girl.name || "Unknown"}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Boys Section */}
          <div className="boysSection p-3 rounded-3">
            <h5 className="fw-bold text-white mb-3">Meet The Boys</h5>
            <div className="li-strip-row">
               {maleContestants
                .filter(boy => !boy.bombshell) // 👈 exclude bombshells
                .map((boy, index) => (
                <div className="li-chip" key={boy.id ?? index}>
                  <div className="li-avatar ring-turquoise">
                    <img
                      src={boy.photo_url}
                      alt={boy.name || `Contestant ${index + 1}`}
                    />
                  </div>
                  <div className="li-name"title={boy.name || "Unknown"}>{boy.name || "Unknown"}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};