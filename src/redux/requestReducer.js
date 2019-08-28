import axios from "axios";
import {
    CREATE_REQUEST, EDIT_REQUEST, DELETE_REQUEST, GET_REQUESTS_BY_ID, GET_AVAILABLE_REQUESTS
} from "./actionTypes.js";

const initialState = {
    allRequests: [],
    error: false,
    redirect: false
};

//ACTIONS------------------------------

//REQUEST ACTIONS ----------------------------------------------------------

export const createRequest = (id, requestDate, locationLatitude, locationLongitude, requestSeatNum, tierId, requestStartTime, requestEndTime, location, requesterCell) => {
    let data = axios.post("/api/create-request", { id, requestDate, locationLatitude, locationLongitude, requestSeatNum, tierId, requestStartTime, requestEndTime, location, requesterCell }).then(res => res.data)
    console.log('data in requestReducer', data)
    return { type: CREATE_REQUEST, payload: data };
};

export const editRequest = (request_id, request_date, request_location_lat, request_location_long, request_seat_number, tier_id, rider_id, request_start_time, request_end_time, requester_cell_number) => {
    let data = axios.put("/api/edit-request", { request_id, request_date, request_location_lat, request_location_long, request_seat_number, tier_id, rider_id, request_start_time, request_end_time, requester_cell_number }).then(res => res.data)
    return { type: EDIT_REQUEST, payload: data };
};

export const getRequestsById = (userId) => {
    let data = axios
        .get(`/api/get-requests/${userId}`)
        .then(res => {
           return  res.data})
    return {
        type:GET_REQUESTS_BY_ID,
        payload: data,
        error: false
    }
}

export const getAvailableRequests = () => {
    let data = axios
        .get(`/api/get-available-requests`)
        .then(res => {
           return  res.data})
    return {
        type:GET_AVAILABLE_REQUESTS,
        payload: data,
        error: false
    }
}

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

        case GET_REQUESTS_BY_ID + "_FULFILLED":
            return {...state, allRequests: payload};
        case GET_REQUESTS_BY_ID + "_REJECTED":
            return {...state, error: true};    
        default:
            return state;
    }
}