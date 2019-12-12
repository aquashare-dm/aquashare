import axios from "axios";
import { GET_RIDES, SAVE_CRITERIA, GET_RIDES_BY_ID, CREATE_RIDE, GET_RIDES_BY_DRIVER_ID, GET_CONFIRMED_RIDES_BY_DRIVER_ID, RESERVE_TUBE_SEAT } from "./actionTypes.js";

const initialState = {
    searchCriteria: {
        firstDate: '',
        secondDate: '',
        location: '',
        locationLatitude: "",
        locationLongitude: "",
        numberOfRiders: 0,
        radius: 50
    },
    rides: [],
    filteredRides: [],
    error: false
};

//ACTIONS------------------------------

export const getRides = (locationLatitude, locationLongitude, radius) => {
    let data = axios.post("/api/get-rides", { locationLatitude, locationLongitude, radius }).then(res => res.data)
    return {
        type: GET_RIDES,
        payload: data
    }
};

export const saveSearchCriteria = (firstDate, secondDate, location, locationLatitude, locationLongitude, numberOfRiders, radius) => {
    let criteria = { firstDate, secondDate, location, locationLatitude, locationLongitude, numberOfRiders, radius }
    return {
        type: SAVE_CRITERIA,
        payload: criteria
    }
}

export const getRidesById = (driverId) => {
    let data = axios
        .get(`/api/get-rides-by-id/${driverId}`)
        .then(res => {
            return res.data
        })
    return {
        type: GET_RIDES_BY_ID,
        payload: data,
        error: false
    }
}
export const createRide = ( driverId, date, location, locationLatitude, locationLongitude, startTime, endTime ) => {
    let data = axios.post("/api/create-ride", { driverId, date, location, locationLatitude, locationLongitude, startTime, endTime }).then(res => res.data)
    return { type: CREATE_RIDE, payload: data };
}

export const getRidesByDriverId = (userId) => {
    let data = axios
        .get(`/api/get-rides-by-driver-id/${userId}`)
        .then(res => {
            return res.data
        })
    return {
        type: GET_RIDES_BY_DRIVER_ID,
        payload: data,
        error: false
    }
}

export const getConfirmedRidesByDriverId = (driverId) => {
    let data = axios
        .get(`/api/get-confirmed-rides-by-driver-id/${driverId}`)
        .then(res => {
            return res.data
        })
    return {
        type: GET_CONFIRMED_RIDES_BY_DRIVER_ID,
        payload: data,
        error: false
    }
}

export const reserveTubeSeat = (token, ridePrice, userId, ride_id, newTubeSeatCount, locationLatitude, locationLongitude, radius) => {
    let data = axios
        .post(`/api/payment/${userId}`, { token, ridePrice, ride_id, newTubeSeatCount, locationLatitude, locationLongitude, radius })
        .then(res => res.data)
    return {
        type: RESERVE_TUBE_SEAT,
        payload: data,
        error: false
    }
}


//Action Function
export default function (state = initialState, action) {
    let { type, payload } = action;
    switch (type) {
        case SAVE_CRITERIA:
            return { ...state, searchCriteria: payload };
        case GET_RIDES + "_FULFILLED":
            return { ...state, rides: payload };
        case GET_RIDES + "_REJECTED":
            return { ...state, error: payload };
        case GET_RIDES_BY_ID + "_FULFILLED":
            return { ...state, filteredRides: payload };
        case GET_RIDES_BY_ID + "_REJECTED":
            return { ...state, error: payload };
        case RESERVE_TUBE_SEAT + "_FULFILLED":
            return { ...state, rides: payload };
        case RESERVE_TUBE_SEAT + "_REJECTED":
            return { ...state, error: payload };

        //DRIVER RIDES
        case CREATE_RIDE + "_FULFILLED":
            return { ...state, rides: payload };
        case CREATE_RIDE + "_REJECTED":
            return { ...state, error: payload };

        case GET_RIDES_BY_DRIVER_ID + "_FULFILLED":
            return { ...state, filteredRides: payload };
        case GET_RIDES_BY_DRIVER_ID + "_REJECTED":
            return { ...state, error: payload };

        case GET_CONFIRMED_RIDES_BY_DRIVER_ID + "_FULFILLED":
            return { ...state, filteredRides: payload };
        case GET_CONFIRMED_RIDES_BY_DRIVER_ID + "_REJECTED":
            return { ...state, error: payload };    
        default:
            return state;

    }
}