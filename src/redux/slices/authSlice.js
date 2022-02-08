import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Axios } from "../../axios";
import jwtDecode from "jwt-decode";


export const registerUser = createAsyncThunk('auth/createUser', async (user) => {
    const result = await Axios.post('/users', user);
    return result.data;
});

export const loginUser = createAsyncThunk('auth/loginUser', async (login) => {
    const result = await Axios.post('/users/login', login);
    return result.data;
});

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isRegistered: false,
        isLoggedIn: false,
        user: {},
        isLoading: false,
        isError: null,
        errorMessage: ''
    },
    reducers: {
        loggedUser: (state,action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
        },
        loggedOut: (state) => {
            localStorage.removeItem('token');
            state.user = {};
            state.isLoggedIn = false;
        },
        updateLoggedIn: (state) => {
            state.isLoggedIn = true;
        }
    },
    extraReducers: {
        // register
        [registerUser.fulfilled]: (state,action) => {
            state.isLoading = false;
            state.isRegistered = true;
        },
        [registerUser.pending]: (state) => {
            state.isLoading = true;
        },
        [registerUser.rejected]: (state) => {
            state.isLoading = false;
            state.error = true;
            state.errorMessage = 'Registration failed';
        },
        // login
        [loginUser.fulfilled]: (state,action) => {
            state.isLoading = false;
            localStorage.setItem('token', action.payload.token);
            state.isLoggedIn = true;

        },
        [loginUser.pending]: (state) => {
            state.isLoading = true;
        },
        [loginUser.rejected]: (state) => {
            state.isLoading = false;
            state.error = true;
            state.errorMessage = 'Login failed';
        }
    }
});

export const { loggedUser, loggedOut, updateLoggedIn } = authSlice.actions;

export default authSlice.reducer;