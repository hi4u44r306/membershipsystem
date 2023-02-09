import React from "react";
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Login from "../Pages/Login";
import Profile from "../Pages/Profile";
import QRScanner from "../Pages/QRScanner";
import Signup from "../Pages/Signup";
import './App.scss'

const App = () => {

    return (
        <>
            <BrowserRouter>
                <nav>
                    {/* <Link to="/">Login</Link>
                    <Link to="/signup">Signup</Link> */}

                    <Link to="/profile/:userid">Profile</Link>
                    <Link to="/scanner">QRScanner</Link>
                </nav>
                <Routes>
                    <Route path="/" exact element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/profile/:userid" element={<Profile />} />
                    <Route path="/scanner" element={<QRScanner />} />
                </Routes>
            </BrowserRouter>
        </>

    );
}

export default App;