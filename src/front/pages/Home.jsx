import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Leaderboard } from "./Leaderboard.jsx";
import { loginUser } from "../components/UserCRUD.jsx";

export const Home = () => {
	const { store, dispatch } = useGlobalReducer()
	const getIslanderGirls = (girls) =>{
			const allseasonsgirls = girls.bachelor //filtering all girls from the bachelor seasons
			const season23datagirls = allseasonsgirls["23"] //filtering all contestant data from S23
			const fcontestantslist = season23datagirls.contestants //actual list of female contestants in S23
			fcontestantslist.length = 15; //declares length of female islanders we are choosing, 15 
			for (let i = 0;i <=4 ;i++){
				const selectcontestant = fcontestantslist[i] //	 
				selectcontestant.bombshell = true //adding bombshell as an object, we need to do this to 5 random females to fcontestants

			} 
			 console.log("array of 15 female contestants!!", fcontestantslist)
	}
	const getIslanderBoys = (boys) => {
		const allseasonsboys = boys.bachelorette //filtering all male contestants from all seasons
		const season14databoys = allseasonsboys["14"] //pulling all data from S14
		const mcontestantslist = season14databoys.contestants //pulling all men from S14
		mcontestantslist.length = 15; //reduces male islander list to 15 
			for (let i = 0; i <= 4;i ++){ //for loop selects up to 5 male bombshells
				const selectcontestant = mcontestantslist[i]
				selectcontestant.bombshell = true
				}
				console.log("list of male contestants!!!", mcontestantslist)
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
