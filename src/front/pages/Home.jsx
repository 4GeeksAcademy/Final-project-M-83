import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const Home = () => {
	const { store, dispatch } = useGlobalReducer()
	
	return (
		<div>
			home
		</div>
	);
}; 

export default Home;