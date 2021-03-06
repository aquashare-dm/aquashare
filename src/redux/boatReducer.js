import axios from "axios";
import {
    CREATE_BOAT, EDIT_BOAT, RESET_STATE_ON_LOGOUT, GET_BOAT
} from "./actionTypes.js";
import { utimes } from "fs";

const initialState = {
    boat: {},
    error: false,
    redirect: false
};

//ACTIONS------------------------------

//BOAT ACTIONS ----------------------------------------------------------

export const resetBoatStateOnLogout = () => {
    let data = axios.delete("/api/logout").then(res => res.data)
    return { type: RESET_STATE_ON_LOGOUT, payload: data };
};

export const createBoat = (boatName, tierId, boatDescription, boatLicense, boatRegistration, boatMake, boatModel,
    boatSeatNum, tubeSeatNum, boatImageOne, driverId) => {
    let data = axios.post("/api/create-boat", {
        boatName, tierId, boatDescription, boatLicense, boatRegistration, boatMake, boatModel,
        boatSeatNum, tubeSeatNum, boatImageOne, driverId
    }).then(res => res.data)
    return { type: CREATE_BOAT, payload: data };
};

export const editBoat = (driverId, newBoatName, newBoatDescription, newBoatLicense, newBoatRegistration, newBoatMake, newBoatModel, newBoatSeatNumber, newBoatImageOne, newTubeSeatNumber, newTierId) => {
    let data = axios.put("/api/edit-boat", { driverId, newBoatName, newBoatDescription, newBoatLicense, newBoatRegistration, newBoatMake, newBoatModel, newBoatSeatNumber, newBoatImageOne, newTubeSeatNumber, newTierId }).then(res => res.data)
    return { type: EDIT_BOAT, payload: data };
};

export const getBoatInfo = (driverId) => {
    let data = axios.post(`/api/boat/${driverId}`).then(res => res.data)
    return { type: GET_BOAT, payload: data }
}


//Default Function
export default function (state = initialState, action) {
    let { type, payload } = action;
    switch (type) {
        //Boat actions
        case CREATE_BOAT + "_FULFILLED":
            return { ...state, boat: payload, redirect: false, error: false };
        case CREATE_BOAT + "_REJECTED":
            return { ...state, error: payload };

        case EDIT_BOAT + "_FULFILLED":
            return { ...state, boat: payload, redirect: false, error: false };
        case EDIT_BOAT + "_REJECTED":
            return { ...state, error: payload };

        case RESET_STATE_ON_LOGOUT + "_FULFILLED":
            return { ...initialState };
        case RESET_STATE_ON_LOGOUT + "_REJECTED":
            return { ...state, error: payload }

        case GET_BOAT + "_FULFILLED":
            return { ...state, boat: payload }
        case GET_BOAT + "_REJECTED":
            return { ...state, error: payload }

        default:
            return state;
    }
}


