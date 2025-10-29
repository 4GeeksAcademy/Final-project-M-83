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
	const getIslanderGirls = (girls) => {
		const allseasonsgirls = girls.bachelor //filtering all girls from the bachelor seasons
		const season23datagirls = allseasonsgirls["23"] //filtering all contestant data from S23
		const fcontestantslist = season23datagirls.contestants //actual list of female contestants in S23
		fcontestantslist.length = 15; //limit female islander list to 15
		// set up array of urls for female photos
		const fphotoUrls = [
			"https://images.unsplash.com/photo-1699061930674-1be64fe86fc3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=683",
			"https://images.unsplash.com/photo-1742891734968-4f1822442265?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=928",
			"https://images.unsplash.com/photo-1713433366641-4138ec16c909?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=930",
			"https://images.unsplash.com/photo-1729218621053-dd15827d5691?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=774",
			"https://images.unsplash.com/photo-1563049077-3dfdc7018225?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=772",
			"https://images.unsplash.com/photo-1757627569807-248bcb0613ba?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=774",
			"https://images.unsplash.com/photo-1632883515179-4be5d49a0a0d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=774",
			"https://images.unsplash.com/photo-1520065949650-380765513210?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=928",
			"https://images.unsplash.com/flagged/photo-1570700005880-4ecdb8595d4a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=774",
			"https://images.unsplash.com/photo-1525943837837-af668e09139d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=774",
			"https://images.unsplash.com/photo-1635350296718-fdee22f7e079?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=774",
			"https://images.unsplash.com/photo-1632984813506-20e0a94ea806?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=928",
			"https://images.unsplash.com/photo-1610666652096-07e42724bfeb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=774",
			"https://images.unsplash.com/photo-1565187566069-7e7e44267790?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=774",
			"https://images.unsplash.com/photo-1695990189962-44daba7c8067?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=774"
		];
		//assign photo urls to islanders dynamically
		fcontestantslist.forEach((contestant, index) => {
			contestant.photo_url = fphotoUrls[index] || contestant.photo_url; 
		});
		// fcontestantslist[0].photo_url = "https://images.unsplash.com/photo-1699061930674-1be64fe86fc3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=683"
		for (let i = 0; i <= 4; i++) {
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
		for (let i = 0; i <= 4; i++) { //for loop selects up to 5 male bombshells
			const selectcontestant = mcontestantslist[i]
			selectcontestant.bombshell = true
		}
		console.log("list of male contestants!!!", mcontestantslist)
	}
	useEffect(() => {
		actions.getAllIslanders(store, setGirls)
		fetch("/data.json")
			.then((resp) => resp.json())
			.then((data) => {

				getIslanderGirls(data)
				getIslanderBoys(data)
			})
	}, [])
	console.log("girls!!!!", girls)
	return (
		<div>
			<h2>Meet the Girls</h2>
			<div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
				{girls.map((girl, index) => (
					<div key={index} style={{ textAlign: "center" }}>
						<img
							src={girl.photo_url}
							alt={girl.name || `Contestant ${index + 1}`}
							width="150"
							height="150"
							style={{ borderRadius: "10px", objectFit: "cover" }}
						/>
						<p>{girl.name || "Unknown"}</p>
						{girl.bombshell && <p style={{ color: "red" }}>💣 Bombshell</p>}
					</div>
				))}
			</div>
			<Leaderboard />
		</div>
	);
}; 
