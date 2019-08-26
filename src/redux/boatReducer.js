import axios from "axios";
import {
    CREATE_BOAT, EDIT_BOAT, RESET_STATE_ON_LOGOUT
} from "./actionTypes.js";

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

export const editBoat = (boatId, newBoatName, newBoatDescription, newBoatLicense, newBoatRegistration, newBoatMake, newBoatModel, newBoatSeatNumber, newBoatImageOne) => {
    let data = axios.put("/api/edit-boat", { boatId, newBoatName, newBoatDescription, newBoatLicense, newBoatRegistration, newBoatMake, newBoatModel, newBoatSeatNumber, newBoatImageOne }).then(res => res.data)
    return { type: EDIT_BOAT, payload: data };
};


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

        default:
            return state;
    }
}