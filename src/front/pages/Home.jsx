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
	const [girls, setGirls] = useState([])
	const getIslanderGirls = (girls) =>{
			const allseasonsgirls = girls.bachelor //filtering all girls from the bachelor seasons
			const season23datagirls = allseasonsgirls["23"] //filtering all contestant data from S23
			const fcontestantslist = season23datagirls.contestants //actual list of female contestants in S23
			fcontestantslist.length = 15; //declares length of female islanders we are choosing, 15 
			fcontestantslist[0].photo_url = "https://images.unsplash.com/photo-1699061930674-1be64fe86fc3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=683"
			for (let i = 0;i <=4 ;i++){
				const selectcontestant = fcontestantslist[i] //	 
				selectcontestant.bombshell = true //adding bombshell as an object, we need to do this to 5 random females to fcontestants

			} 
			setGirls(fcontestantslist)
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
	console.log("girls!!!!", girls)
	const girlImageUrl = girls.length > 0 ? girls[0].photo_url : ""
	return (
		<div>
			<img src={girlImageUrl}
			width="200"/>
			<Leaderboard />
		</div>
	);
}; 
