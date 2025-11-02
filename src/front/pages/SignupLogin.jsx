import React, { useState, useEffect } from "react"
import storeReducer from "../store";
import "../index.css"

export const SignupLogin = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [statusMessage, setStatusMessage] = useState("")

    const signingUp = () => {
        let options = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email: email,
                password: password
            })
        }
        fetch(store.baseUrl + `api/sign_up`, options)
        .then((resp) => resp.json())
        // .then((data) => )
    };

    const logingIn = () => {
        let options = {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                email: email,
                password: password
            })
        }
        fetch(store.baseUrl + `api/log_in`, options)
        .then((resp) => resp.json())
        .then((data) => {
            setStatusMessage(data.message)
        })
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="login-register-card d-flex shadow-lg">

                <div className="login-input p-5">
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

                <div className="register-section text-center d-flex flex-column justify-content-center align-items-center">
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