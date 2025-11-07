import { useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import React, { useEffect, useState, useCallback } from "react";
import { actions } from "../assets/islanders.js";
import { ContestantGrid } from "../components/Contestant_card.jsx";
import "../css/islanders.css";

export const Islanders = () => {
    const {store, dispatch} = useGlobalReducer();

    const [islanders, setIslanderData] = useState([]);
    const [femaleContestants, setFemaleContestants] = useState([]);
    const [maleContestants, setMaleContestants] = useState([]);
    const [allIslandersForDisplay, setAllIslandersForDisplay] = useState([]);
   

    useEffect(() => {
        actions.getAllIslanders(
            store,
            setIslanderData,
            setFemaleContestants,
            setMaleContestants
        );
    }, [store]);

    // Secondary useEffect to combine the data whenever the individual lists update
    useEffect(() => {
        if (islanders.length > 0) {
            // Combine both lists into one array
            const combinedList = [...femaleContestants, ...maleContestants];
            // Optional: Sort the list alphabetically by name
            combinedList.sort((a, b) => a.name.localeCompare(b.name)); 
            
            setAllIslandersForDisplay(combinedList);
        }
    }, [femaleContestants, maleContestants, islanders.length]);

    const userFavorite = useCallback(
        async (islander) => {
            const ok = await actions.toggleFavoriteIslander(store, dispatch, islander);
            return ok;
        },
        [store, dispatch]
    );

    const hasData = Array.isArray(islanders) && islanders.length > 0;

    return (
        
        <div className="islanders-grid-wrap">
        <div className="islanders">
            <header className="bio-page-header">
                <h1 className="header-title">✨ MEET THE ISLANDERS ✨</h1>
                <h2 className="header-subheader">Meet This Season's Singles Looking for Love</h2>
                {/* Add links or navigation here if needed, matching your wireframe */}
            </header>
            
             {/* Meet the Girls Section */}
            {femaleContestants.length > 0 && (
                <section className="islander-section girls-section">
                    <h2 className="section-title">The Girls</h2>
                    <div className="scrollable-bio-container">
                    <ContestantGrid list={femaleContestants} gender="female" onFavorite={userFavorite} displayBio={true}/>
                    </div>
                </section>
            )}
              {/* Meet the Guys Section */}
            {maleContestants.length > 0 && (
                <section className="islander-section guys-section">
                    <h2 className="section-title">The Guys</h2>
                    <div className="scrollable-bio-container">
                        <ContestantGrid list={maleContestants} gender="male" onFavorite={userFavorite} displayBio={true}/>
                    </div>
                </section>
            )}
        </div>
            {!hasData && (
                <p className="loading-message">
                    {/* Loading islanders...  */}
                </p>
            )}
    
             
              
        </div>
            )}
    