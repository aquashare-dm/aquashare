import { createStore, applyMiddleware, combineReducers } from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import promiseMiddleware from "redux-promise-middleware";
import userReducer from "./userReducer";
import ridesReducer from "./ridesReducer";
import boatReducer from "./boatReducer";
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
    user: userReducer,
    rides: ridesReducer,
    boat: boatReducer,
})

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(promiseMiddleware)))

export const persistor = persistStore(store)
