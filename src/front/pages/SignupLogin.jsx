import React, { useState } from "react";
import "../index.css";
import { signUp } from "../assets/Users";
import { loginUser } from "../assets/Users";
import { logoutUser } from "../assets/Users";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";


export const SignupLogin = () => {
    
    const { store, dispatch } = useGlobalReducer()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerPhone, setRegisterPhone] = useState("");
    const [registerProfImg, setRegisterProfImg] = useState("");

    
    const [showModal, setShowModal] = useState(false);

    
    const loggingIn = (e) => {
        e.preventDefault();

        const credentials = { email, password };

    
        loginUser(store, dispatch, credentials);
    };

    
    const registering = (e) => {
        e.preventDefault();

        const userData = {
            email: registerEmail,
            password: registerPassword,
            username: registerUsername,
            phonenumber: registerPhone,
            profile_image: registerProfImg,
        };

        
        signUp(store, dispatch, userData);

        
        alert("User registered successfully!");
        setShowModal(false);
        setRegisterEmail("");
        setRegisterPassword("");
        setRegisterUsername("");
        setRegisterPhone("");
        setRegisterProfImg("");
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            
            <div className="loginCard d-flex shadow-lg">
                <div className="loginInput p-5">
                    <h2 className="text-center mb-4">Log In</h2>

                    <form onSubmit={loggingIn}>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
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
                                required
                            />
                        </div>

                        <div className="form-check mb-3">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="rememberMe"
                            />
                            <label
                                className="form-check-label"
                                htmlFor="rememberMe"
                            >
                                Remember me
                            </label>
                        </div>

                        <button type="submit" className="btn btn-dark w-100 mb-3">
                            Log In
                        </button>
                    </form>

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
                    <button
                        className="btn register-btn"
                        onClick={() => setShowModal(true)}
                    >
                        Register an account
                    </button>
                </div>
            </div>

            {showModal && (
                <div
                    className="modal fade show"
                    style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Register New Account</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>

                            <div className="modal-body">
                                <form onSubmit={registering}>
                                    <div className="mb-3">
                                        <label className="form-label">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            value={registerEmail}
                                            onChange={(e) =>
                                                setRegisterEmail(e.target.value)
                                            }
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Username</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={registerUsername}
                                            onChange={(e) =>
                                                setRegisterUsername(e.target.value)
                                            }
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            value={registerPassword}
                                            onChange={(e) =>
                                                setRegisterPassword(e.target.value)
                                            }
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Phone Number</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={registerPhone}
                                            onChange={(e) =>
                                                setRegisterPhone(e.target.value)
                                            }
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Profile Image URL</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={registerProfImg}
                                            onChange={(e) =>
                                                setRegisterProfImg(e.target.value)
                                            }
                                        />
                                    </div>

                                    <button type="submit" className="btn btn-primary w-100">
                                        Register
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
