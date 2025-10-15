import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Leaderboard } from "./Leaderboard.jsx";
import { loginUser } from "../components/UserCRUD.jsx";

export const Home = () => {
	const { store, dispatch } = useGlobalReducer()
	useEffect(()=>{
		fetch("/data.json")
		.then((resp)=> resp.json())
		.then((data)=> console.log("data!!!!", data))
		
	},[]) 
	return (
		<div>
			<Leaderboard />
		</div>
	);
}; 

