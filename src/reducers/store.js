import { combineReducers, configureStore } from "@reduxjs/toolkit"
import thunk from "redux-thunk";
import logger from "redux-logger";

import { Auth } from "./auth";


const reducer = combineReducers({
    auth: Auth,
});

const preloadedState = {

};

const Store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk).concat(logger),
    preloadedState
});

export default Store;