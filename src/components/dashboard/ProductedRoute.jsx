import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { loggedUser, updateLoggedIn } from "../../redux/slices/authSlice";

const ProductedRoute = () => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    useEffect(() => {
        const isAuth = () => {
            const token = localStorage.getItem("token");
            if(!token) return false;

            const decoded = jwtDecode(token);

            if(!decoded) return false;
            dispatch(loggedUser(decoded));
            dispatch(updateLoggedIn());
        }
        isAuth();
    },[]);

    return auth.isLoggedIn ? <Outlet/> : <Navigate to="/" />;
};



export default ProductedRoute;