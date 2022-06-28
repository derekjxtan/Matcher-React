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

// TODO:
// Fix error in cors, likely server side issue
// last diagonsis: server cors.corsWithOptions not being called
export const registerUser = (creds) => (dispatch) => {
    return fetch(baseUrl + 'users/register', {
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