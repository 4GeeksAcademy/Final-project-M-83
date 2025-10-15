import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Leaderboard } from "./Leaderboard.jsx";
// try and use filter function to console.log only boys, save in a variable called boys
// try and use filter function to console.log only girls save in a variable called girls
// try and use filter function to console.log only boys from a given season, and save it in a variable.

export const Home = () => {
	const { store, dispatch } = useGlobalReducer()
	const getIslanderGirls = (girls) =>{
			const allseasonsgirls = girls.bachelor //filtering all girls from the bachelor seasons
			// console.log("all girls from all seasons!!!", allseasonsgirls)
			const season23datagirls = allseasonsgirls["23"] //filtering all contestant data from S23
			// console.log("all data from season 23!!!", season23datagirls)
			const fcontestantslist = season23datagirls.contestants //actual list of female contestants in S23
			fcontestantslist.length = 15; //declares length of female islanders we are choosing, 15 
			for (let i = 0;i <=4 ;i++){
				const selectcontestant = fcontestantslist[i] //	 
				// console.log("selecting 5 female bombshells!!!", i)			
				selectcontestant.bombshell = true //adding bombshell as an object, we need to do this to 5 random females to fcontestants

			} 
			//  console.log("array of 15 female contestants!!", fcontestantslist)
	}
	const getIslanderBoys = (boys) => {
		const allseasonsboys = boys.bachelorette //filtering all male contestants from all seasons
		const season14databoys = allseasonsboys["14"] //pulling all data from S14
		// console.log("all data from season 14!!!", season14databoys)
		const mcontestantslist = season14databoys.contestants //pulling all men from S14
		mcontestantslist.length = 15; //reduces male islander list to 15 
		// console.log("array of 15 male islanders!!!", mcontestantslist)
			for (let i = 0; i <= 4;i ++){ //for loop selects up to 5 male bombshells
				const selectcontestant = mcontestantslist[i]
				selectcontestant.bombshell = true
				// console.log("selecting 5 male bombshells!!!", selectcontestant.bombshell)
				}
				// console.log("list of male contestants!!!", mcontestantslist)
			}
	useEffect(()=>{
		fetch("/data.json")
		.then((resp)=> resp.json())
		.then((data)=> {
			
		getIslanderGirls(data)
		// console.log("all data from all bachelor seasons!!", data)
		getIslanderBoys(data)
		// console.log("all data from all bachelorette seasons!!", data)
		})
	},[]) 
	return (
		<div>
			<Leaderboard />
		</div>
	);
}; 
