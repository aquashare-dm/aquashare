import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import riderReducer from "./riderReducer";

const rootReducer = combineReducers({
    rider: riderReducer,

})

export default createStore(rootReducer, (applyMiddleware(promiseMiddleware)));
