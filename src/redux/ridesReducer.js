import axios from "axios";
import { GET_RIDES, SAVE_CRITERIA } from "./actionTypes.js";

const initialState = {
    searchCriteria: {
        firstDate: '',
        secondDate: '',
        location: '',
        numberOfRiders: ''
    },
    rides: [],
    error: false
};

//ACTIONS------------------------------

export const getRides = (firstDate, secondDate, numberOfRiders) => {
    let data = axios.get("/api/get-rides", { firstDate, secondDate, numberOfRiders }).then(res => res.data)
    return {
        type: GET_RIDES,
        payload: data
    }
};

export const saveSearchCriteria = (firstDate, secondDate, location, numberOfRiders) => {
    console.log('Hit the save criteria reducer')
    let criteria = {firstDate, secondDate, location, numberOfRiders}
    console.log('criteria', criteria)
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
            return {...state, rides: payload};
        case GET_RIDES + "_REJECTED":
            return {...state, error: payload};
        default:
            console.log('Hit the default action type')
            return state;
    }
}