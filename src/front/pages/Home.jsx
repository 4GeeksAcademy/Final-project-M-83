import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Leaderboard } from "./Leaderboard.jsx";

export const Home = () => {
	const { store, dispatch } = useGlobalReducer()
	
	return (
		<div>
			<Leaderboard />
		</div>
	);
}; 

