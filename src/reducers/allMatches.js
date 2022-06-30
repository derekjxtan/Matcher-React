import * as ActionTypes from './ActionTypes';

export const AllMatches = (state = {
        isLoading: false,
        matches: [],
        errMess: null
    }, action) => {
        switch (action.type) {
            case ActionTypes.ALL_MATCHES_LOADING:
                return {...state, isLoading: true, matches: [], errMess: null}

            case ActionTypes.ALL_MATCHES_FAILED:
                return {...state, isLoading: false, matches: [], errMess: action.message}

            case ActionTypes.ALL_MATCHES_SUCCESS:
                return {...state, isLoading: false, matches: action.matches, errMess: null}
        
            default:
                return state;
        }
    }