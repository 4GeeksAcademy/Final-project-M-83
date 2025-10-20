import { useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const deleteIslander = () => {
    const {id} = useParams()
    const {store, dispatch} = useGlobalReducer()
     
    
    const removeIslander = (id) => {
        const options = {
            method: "DELETE",
            headers: {"content-type":"application/json"}
        }
        fetch(store.baseUrl + `islanders/remove/${id}`, options)
        .then()
        .catch((err) => console.error("Error with removing islander: ", err))
    }

    useEffect (
        () => {

        },[]
    )


    return(
        <div>

        </div>
    )
}