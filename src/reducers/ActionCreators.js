import * as ActionTypes from './ActionTypes';

const baseUrl = 'https://localhost:3444/';

// AUTHENTICATION ACTIONS
export const requestLogin = (creds) => ({
    type: ActionTypes.LOGIN_REQUEST,
    username: creds.username
});

export const loginSuccess = (response) => ({
    type: ActionTypes.LOGIN_SUCCESS,
    token: response.token
});

export const loginFailed = (message) => ({
    type: ActionTypes.LOGIN_FAILED,
    message: message
});

export const loginUser = (creds) => (dispatch) => {
    dispatch(requestLogin(creds));

    return fetch(baseUrl + 'users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(creds)
    })
    .then((resp) => {
        if  (resp.ok) {
            return resp;
        }
        else {
            var err = new Error('Error ' + resp.status + ': ' + resp.statusText);
            err.response = resp;
            throw err;
        }
    })
    .then((resp) => resp.json())
    .then((resp) => {
        if (resp.success) {
            localStorage.setItem('token', resp.token);
            localStorage.setItem('username', JSON.stringify(creds.username));
            dispatch(fetchAllMatches());
            dispatch(loginSuccess(resp));
        }
        else {
            var err = new Error('Error ' + resp.status + ': ' + resp.statusText);
            err.response = resp;
            throw err;
        }
    })
    .catch((err) => dispatch(loginFailed(err.message)));
};

export const requestLogout = () => ({
    type: ActionTypes.LOGOUT_REQUEST
});

export const logoutSuccess = () => ({
    type: ActionTypes.LOGOUT_SUCCESS
});

export const logoutUser = () => (dispatch) => {
    dispatch(requestLogout());
    fetch(baseUrl + 'users/logout');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    dispatch(logoutSuccess());
};

export const checkLogin = () => (dispatch) => {
    const token = 'Bearer ' + localStorage.getItem('token');
    if (!token) {
        return;
    }

    return fetch(baseUrl + 'match', {
        headers: {
            'Authorization': token,
        }
    })
    // if can fetch, do nothing
    .then((resp) => {
        if (resp.ok) {
            console.log("Login Checked")
        }
        else {
            dispatch(logoutUser());
            var error = new Error("Login Session has expired, Log in again to continue");
            return error;
        }
    })
    .catch((err) => {
        dispatch(logoutUser());
        var error = new Error("Login Session has expired, Log in again to continue");
        return error;
    });
};

// TODO:
// Fix error in cors, likely server side issue
// last diagonsis: server cors.corsWithOptions not being called
export const registerUser = (creds) => (dispatch) => {
    console.log(creds);
    return fetch(baseUrl + 'users/register', {
        method: 'POST',
        body: JSON.stringify(creds),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then((resp) => {
        if  (resp.ok) {
            return resp;
        }
        else {
            var err = new Error('Error ' + resp.status + ': ' + resp.statusText);
            err.response = resp;
            throw err;
        }
    })
    .then((resp) => resp.json())
    .then((resp) => {
        if (resp.success) {
            console.log("Registration Sucessful!");
        }
        else {
            var err = new Error('Error ' + resp.status + ': ' + resp.statusText);
            err.response = resp;
            throw err;
        }
    })
    .catch((err) => {
        console.log(err);
        return err;
    });
};

// SINGLE MATCH actions
export const singleMatchLoading = () => ({
    type: ActionTypes.SINGLE_MATCH_LOADING
});

export const singleMatchSuccess = (resp) => ({
    type: ActionTypes.SINGLE_MATCH_SUCCESS,
    match: resp
});

export const singleMatchFailed = (message) => ({
    type: ActionTypes.SINGLE_MATCH_FAILED,
    message: message
});

export const fetchSingleMatch = (matchid) => (dispatch) => {
    dispatch(singleMatchLoading());

    const token = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'match/' + matchid, {
        method: 'GET',
        headers: {
            'Authorization': token,
        }
    })
    .then((response) => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    }, error => {
        var err = new Error(error.message);
        throw err;
    })
    .then((response) => response.json())
    .then((match) => dispatch(singleMatchSuccess(match)))
    .catch((err) => dispatch(singleMatchFailed(err.message)));
};

// ALL MATCHES actions
export const allMatchesLoading = () => ({
    type: ActionTypes.ALL_MATCHES_LOADING
});

export const allMatchesSuccess = (resp) => ({
    type: ActionTypes.ALL_MATCHES_SUCCESS,
    matches: resp
});

export const allMatchesFailed = (message) => ({
    type: ActionTypes.ALL_MATCHES_FAILED,
    message: message
});

export const fetchAllMatches = () => (dispatch) => {
    dispatch(allMatchesLoading());

    const token = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'match', {
        headers: {
            'Authorization': token,
        }
    })
    .then((response) => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    }, error => {
        var err = new Error(error.message);
        throw err;
    })
    .then((response) => response.json())
    .then((matches) => dispatch(allMatchesSuccess(matches)))
    .catch((err) => dispatch(allMatchesFailed(err.message)));
};

export const postNewMatch = (match) => (dispatch) => {
    const token = 'Bearer ' + localStorage.getItem('token');
    const newMatch = {
        name: match.name,
        description: match.description,
        set1label: match.set1label,
        set1items: match.set1items,
        set2label: match.set2label,
        set2items: match.set2items
    };
    return fetch(baseUrl + 'match', {
        method: 'POST',
        body: JSON.stringify(newMatch),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        credentials: 'same-origin'
    })
    .then((response) => response.json())
    .then((match) => dispatch(fetchAllMatches()))
    .catch((error) => {
        console.log('Post newMatch', error.message);
        alert('Your New Match could not be posted\nError: ' + error.message);
    });
};

export const deleteAllMatches = () => (dispatch) => {
    const token = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'match', {
        method: 'DELETE',
        headers: {
            'Authorization': token
        },
        credentials: 'same-origin'
    })
    .then((response) => response.json())
    .then((match) => dispatch(fetchAllMatches()))
    .catch((error) => {
        console.log('DELETE matches', error.message);
        alert('Your matches could not be posted\nError: ' + error.message);
    });
};

export const deleteSingleMatch = (matchid) => (dispatch) => {
    const token = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'match/' + matchid, {
        method: 'DELETE',
        headers: {
            'Authorization': token
        },
        credentials: 'same-origin'
    })
    .then((response) => response.json())
    .then((match) => dispatch(fetchAllMatches()))
    .catch((error) => {
        console.log('DELETE matches', error.message);
        alert('Your matches could not be posted\nError: ' + error.message);
    });
};

export const putSingleMatch = (matchid, editedMatch) => (dispatch) => {
    const token = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'match/' + matchid, {
        method: 'PUT',
        body: JSON.stringify(editedMatch),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        credentials: 'same-origin'
    })
    .then((resp) => resp.json())
    .then((match) => dispatch(fetchAllMatches()))
    .catch((error) => {
        console.log('PUT matches', error.message);
        alert('Your match could not be edited\nError: ' + error.message);
    });
};

// Response actions
export const postSingleResponse = (matchid, response) => (dispatch) => {
    return fetch(baseUrl + 'match/' + matchid + '/response', {
        method: 'POST',
        body: response,
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'same-origin'
    })
}

export const deleteAllResponses = (matchid) => (dispatch) => {
    const token = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'match/' + matchid + '/response', {
        method: 'DELETE',
        headers: {
            'Authorization': token
        },
        credentials: 'same-origin'
    })
    .then((resp) => resp.json())
    .then((match) => dispatch(fetchAllMatches()))
    .catch((error) => {
        console.log('DELETE responses', error.message);
        alert('Your responses could not be deleted\nError: ' + error.message);
    });
};

export const deleteSingleResponse = (matchid, responseid) => (dispatch) => {
    const token = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'match/' + matchid + '/response/' + responseid, {
        method: 'DELETE',
        headers: {
            'Authorization': token
        },
        credentials: 'same-origin'
    })
    .then((resp) => resp.json())
    .then((match) => dispatch(fetchAllMatches()))
    .catch((error) => {
        console.log('DELETE response', error.message);
        alert('Your response could not be deleted\nError: ' + error.message);
    });
};

export const fetchResults = (matchid) => (dispatch) => {
    return fetch(baseUrl + 'match/' + matchid + '/result')
    .then((resp) => resp.json())
    .then((match) => dispatch(fetchAllMatches()))
    .catch((error) => {
        console.log('GET ressults', error.message);
        alert('Your results could not be generated\nError: ' + error.message);
    });
};