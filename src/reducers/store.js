import { combineReducers, configureStore } from "@reduxjs/toolkit"
import thunk from "redux-thunk";


const reducer = combineReducers({

});

const preloadedState = {

};

const Store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    preloadedState
});

export default Store;