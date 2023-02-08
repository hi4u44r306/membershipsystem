import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "../Pages/Login";
import Profile from "../Pages/Profile";
import Signup from "../Pages/Signup";

const App = () => {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" exact element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/profile/:userid" element={<Profile />} />
                </Routes>
            </BrowserRouter>
        </>

    );
}

export default App;