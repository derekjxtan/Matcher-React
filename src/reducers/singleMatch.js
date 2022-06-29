import * as ActionTypes from './ActionTypes';

export const SingleMatch = (state = {
        isLoading: false,
        match: null,
        errMess: null
    }, action) => {
        switch (action.type) {
            case ActionTypes.SINGLE_MATCH_LOADING:
                return {...state, isLoading: true, match: null, errMess: null}

            case ActionTypes.SINGLE_MATCH_FAILED:
                return {...state, isLoading: false, match: null, errMess: action.message}

            case ActionTypes.SINGLE_MATCH_SUCCESS:
                return {...state, isLoading: false, match: action.match, errMess: null}
        
            default:
                return state;
        }
    }