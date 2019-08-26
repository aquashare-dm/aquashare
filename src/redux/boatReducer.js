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

export const createBoat = (boat_name, tier_id, boat_description, boat_license, boat_registration, boat_make, boat_model,
    boat_seat_number, boat_image_one, driver_id) => {
    let data = axios.post("/api/create-boat", {
        boat_name, tier_id, boat_description, boat_license, boat_registration, boat_make, boat_model,
        boat_seat_number, boat_image_one, driver_id
    }).then(res => res.data)
    return { type: CREATE_BOAT, payload: data };
};

export const editBoat = (boatId, newBoatName, newBoatDescription, newBoatLicense, newBoatRegistration, newBoatMake, newBoatModel, newBoatSeatNumber, newBoatImageOne, newBoatImageTwo) => {
    let data = axios.put("/api/edit-boat", { boatId, newBoatName, newBoatDescription, newBoatLicense, newBoatRegistration, newBoatMake, newBoatModel, newBoatSeatNumber, newBoatImageOne, newBoatImageTwo }).then(res => res.data)
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