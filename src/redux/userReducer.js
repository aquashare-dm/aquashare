import axios from "axios";
import {
    RIDER_SIGNUP, RIDER_LOGIN, GET_RIDER, RIDER_LOGOUT,
    DRIVER_SIGNUP, DRIVER_LOGIN, GET_DRIVER, DRIVER_LOGOUT, RIDER_REGISTER, DRIVER_REGISTER, EDIT_RIDER_PROFILE, EDIT_DRIVER_PROFILE
} from "./actionTypes.js";

const initialState = {
    user: {},
    error: false,
    redirect: false
};



//ACTIONS------------------------------

//RIDER ACTIONS
export const riderLogin = (riderUsername, riderPassword) => {
    let data = axios.post("/api/rider-login", { riderUsername, riderPassword }).then(res => res.data)
    return { type: RIDER_LOGIN, payload: data };
};

export const riderSignup = (riderUsername, riderPassword) => {
    let data = axios.post("/api/rider-signup", { riderUsername, riderPassword }).then(res => res.data)
    return {
        type: RIDER_SIGNUP,
        payload: data
    }
};

export const logout = () => {
    let data = axios.delete("/api/logout").then(res => res.data)
    return { type: RIDER_LOGOUT, payload: data };
};

export const getRider = () => {
    let data = axios.get("/api/get-rider").then(res => res.data)
    return { type: GET_RIDER, payload: data };
};

export const riderRegister = (riderUsername, riderEmail, riderFirst, riderLast, riderImage, startRating) => {
    let data = axios.put('/api/rider-register', { riderUsername, riderEmail, riderFirst, riderLast, riderImage, startRating }).then(res => res.data)
    return { type: RIDER_REGISTER, payload: data }
};

export const editRiderProfile = (riderUsername, newRiderEmail, newRiderFirst, newRiderLast, newRiderImage) => {
    console.log('hitting edit Rider Profile', newRiderImage)
    let data = axios.put('/api/edit-rider', { riderUsername, newRiderEmail, newRiderFirst, newRiderLast, newRiderImage }).then(res => res.data)
    return { type: EDIT_RIDER_PROFILE, payload: data }
}

//DRIVER ACTIONS
export const driverLogin = (driverUsername, driverPassword) => {
    let data = axios.post("/api/driver-login", { driverUsername, driverPassword }).then(res => res.data)
    return { type: DRIVER_LOGIN, payload: data };
};

export const driverSignup = (driverUsername, driverPassword) => {
    let data = axios.post("/api/driver-signup", { driverUsername, driverPassword }).then(res => res.data)
    return {
        type: DRIVER_SIGNUP,
        payload: data
    }
};

export const getDriver = () => {
    let data = axios.get("/api/get-driver").then(res => res.data)
    return { type: GET_DRIVER, payload: data };
};

export const driverRegister = (driverUsername, driverEmail, driverFirst, driverLast, driverImage, driverLicense, startRating) => {
    let data = axios.put('/api/driver-register', { driverUsername, driverEmail, driverFirst, driverLast, driverImage, driverLicense, startRating }).then(res => res.data)
    return { type: DRIVER_REGISTER, payload: data }
}
export const editDriverProfile = (driverId, newDriverEmail, newDriverFirst, newDriverLast, newDriverImage, newDriverLicense ) => {
    let data = axios.put('/api/edit-driver', { driverId, newDriverEmail, newDriverFirst, newDriverLast, newDriverImage, newDriverLicense }).then(res => res.data)
    return { type: EDIT_DRIVER_PROFILE, payload: data }
}

//Default Function
export default function (state = initialState, action) {
    let { type, payload } = action;
    switch (type) {
        //Rider actions
        case RIDER_SIGNUP + "_FULFILLED":
            return { ...state, user: payload, redirect: false, error: false };
        case RIDER_SIGNUP + "_REJECTED":
            return { ...state, error: payload };
        case RIDER_LOGIN + "_FULFILLED":
            return { ...state, user: payload, redirect: false, error: false };
        case RIDER_LOGIN + "_REJECTED":
            return { ...state, error: payload };

        case GET_RIDER + "_FULFILLED":
            return { ...state, user: payload };
        case GET_RIDER + "_REJECTED":
            return { ...state, error: payload }

        case RIDER_LOGOUT + "_FULFILLED":
            return { ...initialState };
        case RIDER_LOGOUT + "_REJECTED":
            return { ...state, error: payload };
        case RIDER_REGISTER + "_FULFILLED":
            return { ...state, user: payload, error: false }
        case RIDER_REGISTER + "_REJECTED":
            return { ...state, error: payload }
        case EDIT_RIDER_PROFILE + "_FULFILLED":
            return { ...state, user: payload, error: false }
        case EDIT_RIDER_PROFILE + "_REJECTED":
            return { ...state, error: payload }

        //Driver Actions
        case DRIVER_SIGNUP + "_FULFILLED":
            return { ...state, user: payload, redirect: false, error: false };
        case DRIVER_SIGNUP + "_REJECTED":
            return { ...state, error: payload };

        case DRIVER_LOGIN + "_FULFILLED":
            return { ...state, user: payload, redirect: false, error: false };
        case DRIVER_LOGIN + "_REJECTED":
            return { ...state, error: payload };

        case GET_DRIVER + "_FULFILLED":
            return { ...state, user: payload };
        case GET_DRIVER + "_REJECTED":
            return { ...state, error: payload }

        case DRIVER_LOGOUT + "_FULFILLED":
            return { ...initialState };
        case DRIVER_LOGOUT + "_REJECTED":
            return { ...state, error: payload }

        case DRIVER_REGISTER + "_FULFILLED":
            return { ...state, user: payload, error: false }
        case DRIVER_REGISTER + "_REJECTED":
            return { ...state, error: payload }
        case EDIT_DRIVER_PROFILE + "_FULFILLED":
            return { ...state, user: payload, error: false }
        case EDIT_DRIVER_PROFILE + "_REJECTED":
            return { ...state, error: payload }

        default:
            console.log('hitting default')
            return state;
    }
}
