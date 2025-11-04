import React, { useState, useEffect } from "react"
import storeReducer from "../store";
import "../index.css"
import { signUp } from "../assets/Users";
import { loginUser } from "../assets/Users";
import { logoutUser } from "../assets/Users";

export const SignupLogin = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [statusMessage, setStatusMessage] = useState("")
    const [displayModal, setDisplayModal] = useState("")
    const [registerEmail, setRegisterEmail] = useState("")
    const [registerPassword, setRegisterPassword] = useState("")
    const [registerUsername, setRegisterUsername] = useState("")
    const [registerPhone, setRegisterPhone] = useState("")
    const [registerProfImg, setRegisterProfImg] = useState("")

    const registering = (e) => {
        e.preventDeault();

        const userData = {
            email: registerEmail,
            password: registerPassword,
            username: registerUsername,
            phonenumber: registerPhone,
            profile_image: registerProfImg
        }
    }

    const signUp = (store , dispatch , userData) => {
    fetch(store.baseUrl + "user",{
        method: "POST",
        headers: { "Content-Type" : "application/json"},
        body: JSON.stringify (userData)
    })
    .then((resp)=> resp.json())
    .then((data)=>{
        console.log("User Created:", data);
        dispatch({
        type: "addUser",
        payload:data.user || data
    });
})
    .catch(err => console.error("Error creating user :",err));
};

    const loginUser = (store, dispatch, credentials) => {
    fetch(store.baseUrl + "log_in", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(credentials)
    })
    .then(resp => resp.json())
    .then(data => {
        console.log("Login data:", data);
        if (data.token) {
            localStorage.setItem("token", data.token);
            dispatch({
                type: "setAuth",
                payload: {
                    isAuthenticated: true,
                    token: data.token,
                    user: data.user
                }
            });
        } else {
            alert("Invalid credentials");
        }
    })
    .catch(err => console.error("Login error:", err));
};

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="loginCard d-flex shadow-lg">

                <div className="loginInput p-5">
                    <h2 className="text-center mb-4">Log In</h2>

                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter username"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="form-check mb-3">
                        <input type="checkbox" className="form-check-input" id="rememberMe" />
                        <label className="form-check-label" htmlFor="rememberMe">
                            Remember me
                        </label>
                    </div>

                    <button className="btn btn-dark w-100 mb-3">Log In</button>

                    <div className="text-center">
                        <a href="#" className="forgot-password-link">
                            Forgot your password?
                        </a>
                    </div>
                </div>

                <div className="registerSection text-center d-flex flex-column justify-content-center align-items-center">
                    <h3 className="mb-3 text-white">Register</h3>
                    <p className="text-white mb-4">
                        Don’t have an account? Register now!
                    </p>
                    <button className="btn register-btn">Register an account</button>
                </div>
            </div>
        </div>
    );
};