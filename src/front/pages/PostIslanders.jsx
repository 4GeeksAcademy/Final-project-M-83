import { useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import React, { useEffect, useState } from "react";

export const addIslander = () => {
    
    const { store, dispatch } = useGlobalReducer()
    const [name, setName] = useState(store.islanderInfo.name)
    const [age, setAge] = useState(store.islanderInfo.age)
    const [occupation, setOccupation] = useState(store.islanderInfo.occupation)
    const [hometown, setHometown] = useState(store.islanderInfo.hometown)
    const [bombshell, setBombshell] = useState(store.islanderInfo.bombshell)
    
     const newIslander = () => {
        const options = {
            method: "POST",
            headers: {"content-type":"application/json"},
            body: JSON.stringify({
                "name": name,
                "age": age,
                "occupation": occupation,
                "hometown": hometown,
                "bombshell": bombshell
            })
        }
        fetch(store.url + `islanders/add`, options)
        .then((resp) => resp.json())
        .then((data) => dispatch({ payload: data.islanders, type: "set-islanders" }))
    }
    
    
    return(
        <div>

        </div>
    )
};