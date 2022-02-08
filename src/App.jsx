import React, {Fragment, useEffect} from 'react';
import jwtDecode from "jwt-decode";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignIn from "./components/auth/Sign-in";
import SignUp from "./components/auth/Sign-up";
import Navbar from "./components/common/navbar";
import ProductedRoute from "./components/dashboard/ProductedRoute";
import Dashboard from "./components/dashboard/dashboard";

const App = () => {
    return (
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="/" element={ <SignIn/> } />
                <Route path="/sign-up" element={ <SignUp/> } />
                <Route element={ <ProductedRoute/> }>
                    <Route path="/dashboard" element={ <Dashboard/> } />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;