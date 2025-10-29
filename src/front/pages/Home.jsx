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
	const [boys, setBoys] = useState([])
	const getIslanderBoys = (boys) => {
		const allseasonsboys = boys.bachelorette //filtering all male contestants from all seasons
		const season14databoys = allseasonsboys["14"] //pulling all data from S14
		const mcontestantslist = season14databoys.contestants //pulling all men from S14
		mcontestantslist.length = 15; //reduces male islander list to 15 
		const mphotoUrls = [
			"https://images.unsplash.com/photo-1582734110223-a690d6e8c579?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=774",
			"https://images.unsplash.com/photo-1587752370712-a03186c4a3fd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1964",
			"https://images.unsplash.com/photo-1589481158353-4ac067b3fd37?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTV8RkQzaVc4V2VzX1l8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=60&w=900",
			"https://images.unsplash.com/photo-1660925476980-f0590afabc98?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTZ8RkQzaVc4V2VzX1l8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=60&w=900",
			"https://images.unsplash.com/photo-1662755674851-ecad5d80fd85?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8OHxGRDNpVzhXZXNfWXx8ZW58MHx8fHx8&auto=format&fit=crop&q=60&w=900",
			"https://images.unsplash.com/photo-1580103172134-a517c04882b2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NXxGRDNpVzhXZXNfWXx8ZW58MHx8fHx8&auto=format&fit=crop&q=60&w=900",
			"https://images.unsplash.com/photo-1679409112795-ae0f886f80a0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXxGRDNpVzhXZXNfWXx8ZW58MHx8fHx8&auto=format&fit=crop&q=60&w=900",
			"https://images.unsplash.com/photo-1629239378188-987342eeb0f4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NnxGRDNpVzhXZXNfWXx8ZW58MHx8fHx8&auto=format&fit=crop&q=60&w=900",
			"https://images.unsplash.com/photo-1647184936843-99d37c71f8d6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8OXxGRDNpVzhXZXNfWXx8ZW58MHx8fHx8&auto=format&fit=crop&q=60&w=900",
			"https://images.unsplash.com/photo-1760411193150-28074602e9cd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTR8RkQzaVc4V2VzX1l8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=60&w=900",
			"https://images.unsplash.com/photo-1591737591066-7b8c9a2a6940?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MjB8RkQzaVc4V2VzX1l8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=60&w=900",
			"https://images.unsplash.com/photo-1614484588704-59368561fa82?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTl8RkQzaVc4V2VzX1l8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=60&w=900",
			"https://images.unsplash.com/photo-1609147300675-00492e04e452?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8N3xGRDNpVzhXZXNfWXx8ZW58MHx8fHx8&auto=format&fit=crop&q=60&w=900",
			"https://images.unsplash.com/photo-1717407185031-cbf1db998d3b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTY4fHxtYWxlJTIwbW9kZWwlMjBiYXl3YXRjaHxlbnwwfDF8MHx8fDI%3D&auto=format&fit=crop&q=60&w=900",
			"https://images.unsplash.com/photo-1694125398132-2f5365f7a25a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fG1hbGUlMjBzdXJmZXJ8ZW58MHwxfDB8fHwy&auto=format&fit=crop&q=60&w=900"
		]
		//assign male photo Urls dynamically
		mcontestantslist.forEach((contestant, index) => {
			contestant.photo_url = mphotoUrls[index] || contestant.photo_url
		});
		for (let i = 0; i <= 4; i++) { //for loop selects up to 5 male bombshells
			const selectcontestant = mcontestantslist[i]
			selectcontestant.bombshell = true
		}
		setBoys(mcontestantslist)
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
							height="200"
							style={{ borderRadius: "10px", objectFit: "cover" }}
						/>
						<p>{girl.name || "Unknown"}</p>
						{girl.bombshell && <p style={{ color: "red" }}>💣 Bombshell!</p>}
					</div>
				))}
			</div>
			<h2>Meet the Guys</h2>
			<div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
				{boys.map((boy, index) => (
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

			<Leaderboard />
		</div>
	);
}; 
