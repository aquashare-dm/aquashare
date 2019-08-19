import axios from "axios";
import {RIDER_SIGNUP, RIDER_LOGIN, GET_RIDER, RIDER_LOGOUT} from "./actionTypes.js";

const initialState = {
    user: {loggedIn: false},
    error: false,
    redirect: false
};

//ACTIONS------------------------------

export const riderLogin = (riderUsername, riderPassword) => {
    let data = axios.post("/api/rider-login", {riderUsername, riderPassword}).then(res => res.data)
    return {type: RIDER_LOGIN, payload: data};
};

export const riderSignup = (riderUsername, riderPassword) => {
    console.log("Triggered ridersignup in reducer");
    let data = axios.post("/api/rider-signup", {riderUsername, riderPassword}).then(res=>res.data)
    return{
        type: RIDER_SIGNUP,
        payload: data
    }
};



export const riderLogout = () => {
    let data = axios.delete("/api/rider-logout").then(res => res.data)
    return {type: RIDER_LOGOUT, payload: data};
};

export const getRider = () => {
    let data = axios.get("/api/get-rider").then(res => res.data)
    return {type: GET_RIDER, payload: data};
};

export default function (state = initialState, action){
    let {type, payload} = action;
    switch(type){
        case RIDER_SIGNUP + "_FULFILLED":
            return { ...state, user: payload, redirect: false, error: false };
        case RIDER_SIGNUP + "_REJECTED":
            return { ...state, error: payload };

        case RIDER_LOGIN + "_FULFILLED":
            return { ...state, user: payload, redirect: false, error: false };
        case RIDER_LOGIN + "_REJECTED":
            return { ...state, error: payload};

        case GET_RIDER + "_FULFILLED":
            return {...state, user: payload};
        case GET_RIDER + "_REJECTED":
            return {...state, error: payload}

        case RIDER_LOGOUT + "_FULFILLED":
                return {...state, ...initialState};
        case RIDER_LOGOUT + "_REJECTED":
            return {...state, error: payload}

        default:
            return state;
    }
}