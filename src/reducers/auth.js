import * as ActionTypes from './ActionTypes';

export const Auth = (state = {
        isLoading: false,
        isAuthenticated: localStorage.getItem('token') ? true : false,
        token: localStorage.getItem('token'),
        username: localStorage.getItem('username') ? JSON.parse(localStorage.getItem('username')) : null,
        errMess: null 
    }, action) => {
        switch (action.type) {
            case ActionTypes.LOGIN_REQUEST:
                return {...state, isLoading: true, isAuthenticated: false, username: action.username};

            case ActionTypes.LOGIN_FAILED:
                return {...state, isLoading: false, isAuthenticated: false, errMess: action.message};

            case ActionTypes.LOGIN_SUCCESS:
                return {...state, isLoading: false, isAuthenticated: true, token: action.token, errMess: null};

            case ActionTypes.LOGOUT_REQUEST:
                return {...state, isLoading: true, isAuthenticated: true};

            case ActionTypes.LOGOUT_SUCCESS:
                return {...state, isLoading: false, isAuthenticated: false, token: null, user: null};

            default:
                return state;
        }
    }