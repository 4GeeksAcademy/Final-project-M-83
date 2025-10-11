import React, { useEffect, useState } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Leaderboard } from "./Leaderboard.jsx";
import { getAllIslanders } from "../assets/islanders.js";

export const Home = () => {
	const { store, dispatch } = useGlobalReducer()
	const [islanderData, setIslanderData] = useState([])
	useEffect(()=>{
		fetch("/data.json")
		.then((resp)=> resp.json())
		.then((data)=> console.log("data!!!!", data))
		getAllIslanders(store, setIslanderData, islanderData)
		if (islanderData.length > 0){
            console.log("Islander Data TAG!!!! :", islanderData)
		}
	},[]) 
	return (
		<div>
			<Leaderboard />
		</div>
	);
}; 

