import React, { useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../../redux/slices/authSlice";

const SignUp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const nameRef = useRef('');
    const emailRef = useRef('');
    const passwordRef = useRef('');

    const handleRegister = (e) => {
        e.preventDefault();
        const user = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value
        }
        dispatch(registerUser(user));
    }

    return (
        <div className="container">
            <div className="row">
                { auth.isRegistered ? navigate('/') : null }
                <div className="col-xxl-4 offset-xxl-4" style={ { paddingTop: '10rem' } }>
                    <div className="card">
                        <div className="card-header">
                            <div className="card-title">Register</div>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleRegister}>
                                <div className="mb-3">
                                    <label htmlFor="">Name</label>
                                    <input type="text" ref={nameRef} className="form-control" placeholder="Enter Name"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="">Email</label>
                                    <input type="text" ref={emailRef} className="form-control" placeholder="Enter Email"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="">Password</label>
                                    <input type="password" ref={passwordRef} className="form-control" placeholder="Enter Password"/>
                                </div>
                                <div className="mb-3">
                                    <button className="btn btn-outline-primary w-100">Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;