import React, {useRef} from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../redux/slices/authSlice";

const SignIn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const userNameRef = useRef('');
    const passwordRef = useRef('');

    const handleLogin = (e) => {
        e.preventDefault();
        const login = {
            email: userNameRef.current.value,
            password: passwordRef.current.value,
        }
        dispatch(loginUser(login));
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-xxl-4 offset-xxl-4" style={ { paddingTop: '10rem' } }>
                    <div className="card">
                        <div className="card-header">
                            { auth.isLoggedIn ? navigate("/dashboard") : null }
                            <div className="card-title">Login</div>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label htmlFor="">UserName</label>
                                    <input type="text" ref={userNameRef} className="form-control" placeholder="Enter Username"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="">Password</label>
                                    <input type="password" ref={passwordRef} className="form-control" placeholder="Enter Password"/>
                                </div>
                                <div className="mb-3">
                                    <button className="btn btn-outline-success w-100">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;