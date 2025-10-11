import { useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import React, { useEffect, useState } from "react";
import { getAllIslanders } from "../assets/islanders.js";

export const getIslanders = () => {

    const { store, dispatch } = useGlobalReducer()
    

    useEffect (
        () => {
            
        },[]
    );

    return(
        <div>
            get islanders!!!
        </div>
    )
};