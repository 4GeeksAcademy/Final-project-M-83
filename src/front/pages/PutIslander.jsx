import { useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const putIslander = () => {
    const {id} = useParams()
    const {store, dispatch} = useGlobalReducer()
    const [name, setName] = useState()
    const [age, setAge] = useState()
    const [occupation, setOccupation] = useState()
    const [hometown, setHometown] = useState()
    const [bombshell, setBombshell] = useState()

    useEffect (
        () => {
            const gotIslander = store.islanders.find((islander) => islander.id===parseInt(id))
            
            if (gotIslander) {
                setName(gotIslander.name)
                setAge(gotIslander.age)
                setOccupation(gotIslander.occupation)
                setHometown(gotIslander.hometown)
                setBombshell(gotIslander.bombshell)
            }
        },[id, store.islanders]
    );

    const updateIslanderInfo = () => {
        const options = {
            method: "PUT",
            headers: {"content-type":"application/json"},
            body: JSON.stringify({
                "name": name,
                "age": age,
                "occupation": occupation,
                "hometown": hometown,
                "bombshell": bombshell,
                id: 0
            })
        }
        fetch(store.baseUrl + `islanders/put`, options)
        .then((resp) => resp.json())
    }

    return(
        <div>

        </div>
    )
};