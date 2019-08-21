import axios from "axios";
import { GET_RIDES, SAVE_CRITERIA } from "./actionTypes.js";

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
    error: false
};

//ACTIONS------------------------------

export const getRides = ( locationLatitude, locationLongitude, numberOfRiders, radius) => {
    let data = axios.post("/api/get-rides", { locationLatitude, locationLongitude, numberOfRiders, radius }).then(res => res.data)
    console.log('Ride data from Reducer', data)
    return {
        type: GET_RIDES,
        payload: data
    }
};

export const saveSearchCriteria = (firstDate, secondDate, location, locationLatitude, locationLongitude, numberOfRiders, radius) => {
    let criteria = {firstDate, secondDate, location, locationLatitude, locationLongitude, numberOfRiders, radius}
    return {
        type: SAVE_CRITERIA,
        payload: criteria
    }
}

//Action Function
export default function (state = initialState, action){
    let {type, payload} = action;
    switch(type){
        case SAVE_CRITERIA:
            console.log('Hit the SAVE_CRITERIA action')
            return {...state, searchCriteria: payload};
        case GET_RIDES + "_FULFILLED":
                console.log('Hit the GET_RIDES action')
            return {...state, rides: payload};
        case GET_RIDES + "_REJECTED":
            return {...state, error: payload};
        default:
            console.log('Hit the default action type')
            return state;
    }
}