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

//REQUEST ACTIONS ----------------------------------------------------------

export const createRequest = (request_date, request_location_lat, request_location_long, request_seat_number, tier_id, rider_id, request_start_time, request_end_time) => {
    let data = axios.post("/api/create-request", { request_date, request_location_lat, request_location_long, request_seat_number, tier_id, rider_id, request_start_time, request_end_time }).then(res => res.data)
    return { type: CREATE_REQUEST, payload: data };
};

export const editRequest = (request_id, request_date, request_location_lat, request_location_long, request_seat_number, tier_id, rider_id, request_start_time, request_end_time) => {
    let data = axios.put("/api/edit-request", { request_id, request_date, request_location_lat, request_location_long, request_seat_number, tier_id, rider_id, request_start_time, request_end_time }).then(res => res.data)
    return { type: EDIT_REQUEST, payload: data };
};

//Default Function
export default function (state = initialState, action) {
    let { type, payload } = action;
    switch (type) {
        //Request actions
        case CREATE_REQUEST + "_FULFILLED":
            return { ...state, allRequests: payload, redirect: false, error: false };
        case CREATE_REQUEST + "_REJECTED":
            return { ...state, allRequests: payload };

        case EDIT_REQUEST + "_FULFILLED":
            return { ...state, allRequests: payload, redirect: false, error: false };
        case EDIT_REQUEST + "_REJECTED":
            return { ...state, error: payload };

        default:
            return state;
    }
}