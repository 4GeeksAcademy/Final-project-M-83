import React, { useState, useEffect } from "react"
import storeReducer from "../store";
import "../index.css"

export const SignupLogin = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // const signingUp = () => {
    //     let options = {
    //         method: "POST",
    //         headers: {"Content-Type": "application/json"},
    //         body: JSON.stringify({
    //             email: email,
    //             password: password
    //         })
    //     }
    //     fetch(storeReducer.baseUrl + `api/sign_up`, options)
    //     .then((resp) => resp.json())
    //     .then((data) => )
    // };

    return (
        <div className="container justify-content-center">
            <h1>Sign Up & Log In</h1>

            <div>
                <div>
                    <input
                        placeholder="Email"
                        // value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <input
                        placeholder="Password"
                        type="password"
                        // value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>

        </div>
    )
};