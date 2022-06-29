import { combineReducers, configureStore } from "@reduxjs/toolkit"
import thunk from "redux-thunk";
import logger from "redux-logger";

import { Auth } from "./auth";
import { SingleMatch } from "./singleMatch";
import { AllMatches } from "./allMatches";


const reducer = combineReducers({
    Auth: Auth,
    SingleMatch: SingleMatch,
    AllMatches: AllMatches
});

const preloadedState = {

};

const Store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk).concat(logger),
    preloadedState
});

export default Store;