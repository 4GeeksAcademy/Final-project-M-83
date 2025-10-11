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
			const allseasonsgirls = girls.bachelor //pulling all girls from the bachelor seasons
			const season23datagirls = allseasonsgirls["23"] //pulling all girls from S23
			const fcontestantslist = season23datagirls.contestants //actual list of female contestants in S23
			fcontestantslist.length = 15; //declares length of female islanders we are choosing, 15 
			for (let i = 0;i <=4 ;i++){
				// console.log("data!!!!", i) //we want the for loop to randomly select 5 female bombshells
				const selectcontestant = fcontestantslist[i] //	 			
				selectcontestant.bombshell = true //adding bombshell as an object, we need to do this to 5 randome females to fcontestants

			} 
			//  console.log("data!!!!", fcontestantslist)
	}
	const getIslanderBoys = (boys) => {
		const allseasonsboys = boys.bachelorette
		const season14databoys = allseasonsboys["14"] //pulling all men from S14
		const mcontestantslist = season14databoys.contestants //pulling all males and excludes the bachelorette
		mcontestantslist.length = 15; //reduces male islander list to 15 
			for (let i = 0; i <= 4;i ++){ //for loop selects up to 5 male bombshells
				const selectcontestant = mcontestantslist[i]
				selectcontestant.bombshell = true
				// console.log("data!!!!", i)
				}
			}
	useEffect(()=>{
		fetch("/data.json")
		.then((resp)=> resp.json())
		.then((data)=> {
			
		getIslanderGirls(data)
		getIslanderBoys(data)
		})
	},[]) 
	return (
		<div>
			<Leaderboard />
		</div>
	);
}; 
