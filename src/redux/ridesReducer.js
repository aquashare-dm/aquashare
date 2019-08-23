import axios from "axios";
import { GET_RIDES, SAVE_CRITERIA, GET_RIDES_BY_ID, CREATE_RIDE, GET_RIDES_BY_DRIVER_ID} from "./actionTypes.js";

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

export const getRides = (locationLatitude, locationLongitude, numberOfRiders, radius) => {
    let data = axios.post("/api/get-rides", { locationLatitude, locationLongitude, numberOfRiders, radius }).then(res => res.data)
    console.log('Ride data from Reducer', data)
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
export const createRide = (request_date, request_location_lat, request_location_long, request_seat_number, tier_id, rider_id, request_start_time, request_end_time) => {
    let data = axios.post("/api/create-request", { request_date, request_location_lat, request_location_long, request_seat_number, tier_id, rider_id, request_start_time, request_end_time }).then(res => res.data)
    return { type: CREATE_RIDE, payload: data };
};

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
        
        //DRIVER RIDES
        case CREATE_RIDE + "_FULFILLED":
            return { ...state, rides: payload };
        case CREATE_RIDE + "_REJECTED":
            return { ...state, error: payload };
            
        case GET_RIDES_BY_DRIVER_ID + "_FULFILLED":
            console.log('')
            return { ...state, filteredRides: payload };
        case GET_RIDES_BY_DRIVER_ID + "_REJECTED":
            return { ...state, error: payload };
        default:
            console.log('Hit the default action type')
            return state;

    }
}