import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from "../Components/Navbar";
import Login from "../Pages/Login";
import Profile from "../Pages/Profile";
import QRScanner from "../Pages/QRScanner";
import Signup from "../Pages/Signup";
import './App.scss'

const App = () => {

    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" exact element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/scanner" element={<QRScanner />} />
                </Routes>
            </BrowserRouter>
        </>

    );
}

export default App;