import React, { useEffect, useState } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Leaderboard } from "./Leaderboard.jsx";
import { actions } from "../assets/islanders.js";

// try and use filter function to console.log only boys, save in a variable called boys
// try and use filter function to console.log only girls save in a variable called girls
// try and use filter function to console.log only boys from a given season, and save it in a variable.

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()
	const [femaleContestants, setFemaleContestants] = useState([])
	const [maleContestants, setMaleContestants] = useState([])
	const [allIslanders, setAllIslanders] = useState(null)

	const getIslanderGirls = async (girls) => {
		const allseasonsgirls = girls.bachelor //filtering all girls from the bachelor seasons
		const season23datagirls = allseasonsgirls["23"] //filtering all contestant data from S23
		const fcontestantslist = season23datagirls.contestants //actual list of female contestants in S23
		fcontestantslist.length = 15; //declares length of female islanders we are choosing, 15 
		for (let i = 0; i <= 4; i++) {
			const selectcontestant = fcontestantslist[i] //	 
			selectcontestant.bombshell = true //adding bombshell as an object, we need to do this to 5 random females to fcontestants
		}
		for (const girl of fcontestantslist){
			await actions.newIslander(girl, store, dispatch)
		}
		setFemaleContestants(fcontestantslist)
	}

	const getIslanderBoys = (boys) => {
		const allseasonsboys = boys.bachelorette //filtering all male contestants from all seasons
		const season14databoys = allseasonsboys["14"] //pulling all data from S14
		const mcontestantslist = season14databoys.contestants //pulling all men from S14
		mcontestantslist.length = 15; //reduces male islander list to 15 
		for (let i = 0; i <= 4; i++) { //for loop selects up to 5 male bombshells
			const selectcontestant = mcontestantslist[i]
			selectcontestant.bombshell = true
		}
		mcontestantslist.forEach(
			(boy) => {
				actions.newIslander(boy, store, dispatch)
			}
		) 
		setMaleContestants(mcontestantslist)
	}

	const fetchJsonData = async() => {
		try{
			const response = await fetch("/data.json")
			const data = await response.json()
				getIslanderGirls(data)
				getIslanderBoys(data)
		}
		catch(e){
			console.log("Error getting json data!!!!! :", e)
		}
		
	}
	// Step 1: Fetch islanders on mount
useEffect(async() => {
    // We set 'allIslanders' to null initially to know we are "loading"
    // const [allIslanders, setAllIslanders] = useState(null); 
    
    await actions.getAllIslanders(store, setAllIslanders);
}, []); // Runs once on mount

// Step 2: React to the result of the fetch
useEffect(() => {
    // Don't do anything until allIslanders is set (it's not null)
    if (allIslanders === null) {
        return; // Still loading
    }

    // Now we have the result
    if (allIslanders.length === 0) {
        console.log("No islanders found, fetching new data...");
        fetchJsonData();
    } else {
        console.log("There ARE islanders in the array");
    }
	
}, [allIslanders]); // This effect runs *after* allIslanders changes
console.log("ALL ILANDERS TAG!!!!!!!!! :", allIslanders)
	return (

		<div>
			<Leaderboard />
			<button
				onClick={() => maleContestants.forEach(contestant => {
					actions.newIslander(contestant, store, dispatch)
				}
				)
				}
			>
				Add Male Islander
			</button>
			<button
				onClick={() => femaleContestants.forEach(contestant => {
					actions.newIslander(contestant, store, dispatch)
				})}
			>
				Add Female Islanders
			</button>
		</div>

	);
};