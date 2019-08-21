import axios from "axios";
import {
    CREATE_REQUEST, EDIT_REQUEST, DELETE_REQUEST
} from "./actionTypes.js";

const initialState = {
    allRequests: [],
    error: false,
    redirect: false
};

//ACTIONS------------------------------

//BOAT ACTIONS ----------------------------------------------------------

export const createRequest = (request_date, request_location_lat, request_location_long, request_seat_number, tier_id, rider_id, request_start_time, request_end_time) => {
    let data = axios.post("/api/create-request", { request_date, request_location_lat, request_location_long, request_seat_number, tier_id, rider_id, request_start_time, request_end_time }).then(res => res.data)
    return { type: CREATE_REQUEST, payload: data };
};

export const editBoat = (boat_id, boat_name, tier_id, boat_description, boat_license, boat_registration, boat_make, boat_model,
    boat_seat_number, boat_image_one, boat_image_two, driver_id) => {
    let data = axios.put("/api/edit-request", { boat_id, boat_name, tier_id, boat_description, boat_license, boat_registration, boat_make, boat_model,
        boat_seat_number, boat_image_one, boat_image_two, driver_id }).then(res => res.data)
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

        default:
            return state;
    }
}