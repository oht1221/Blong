import axios from 'axios'
import { all, call, takeEvery, put, fork } from 'redux-saga/effects'
import { LOGIN_FAILURE,
    LOGIN_SUCCESS,
    LOGIN_REQUEST,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    USER_LOADING_REQUEST,
    USER_LOADING_SUCCESS,
    USER_LOADING_FAILURE,
    JOIN_FAILURE,
    JOIN_SUCCESS,
    JOIN_REQUEST,
    CLEAR_ERROR_FAILURE,
    CLEAR_ERROR_SUCCESS, 
    CLEAR_ERROR_REQUEST } from '../types'

// Login

const loginUserAPI = (loginData) => {
    console.log(loginData, "loginData");
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    return axios.post('/auth/login', loginData, config);
}

function* loginUser(action){
    try{
        const result = yield call(loginUserAPI, action.payload);
        console.log(result);
        yield put({
            type: LOGIN_SUCCESS,
            payload: result.data 
        });
    }
    catch(e){
        yield put({
            type: LOGIN_FAILURE,
            payload: e.response
        });
        console.error(e);
    }
}


//Join
const joinUserAPI = (req) => {
    console.log(req, "req");

    return axios.post('/user', req);
}

function* joinUser(action){
    try{
        const result = yield call(joinUserAPI, action.payload);
        console.log(result, "Join Data");
        yield put({
            type: JOIN_SUCCESS
        });
    }
    catch(e){
        yield put({
            type: JOIN_FAILURE,
            payload: e.response
        });
        console.error(e);
    }
} 

//Logout
function* logout(action){
    try{
        yield put({
            type: LOGOUT_SUCCESS
        });
    }
    catch(e){
        yield put({
            type: LOGOUT_FAILURE
        });
        console.error(e);
    }    
}

//Loading
const userLoadingAPI = (token) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    if(token){
        config.headers["x-auth-token"] = token;
    }
    return axios.get('/auth/verify', config);
}

function* userLoading(action){
    try{
        console.log(action, "userLoading");
        const result = yield call(userLoadingAPI, action.payload);
        console.log(result);
        yield put({
            type: USER_LOADING_SUCCESS,
            payload: result.data
        });
    }
    catch(e){
        yield put({
            type: USER_LOADING_FAILURE,
            payload: e.response
        });
        console.error(e);
    }
}


//clearError
function* clearError() {
    try{
        yield put({
            type: CLEAR_ERROR_SUCCESS,
        });
    }
    catch(e){
        yield put({
            type: CLEAR_ERROR_FAILURE
        });
        console.error(e);
    }
}

//watchers
function* watchLoginUser() {
    yield takeEvery(LOGIN_REQUEST, loginUser);
}

function* watchLogout(){
    yield takeEvery(LOGOUT_REQUEST, logout);
}

function* watchJoinUser(){
    yield takeEvery(JOIN_REQUEST, joinUser);
}

function* watchUserLoading(){
    yield takeEvery(USER_LOADING_REQUEST, userLoading);
}

function* watchClearError(){
    yield takeEvery(CLEAR_ERROR_REQUEST, clearError);
}

export default function* authSaga() {
    yield all([
        fork(watchLoginUser),
        fork(watchLogout),
        fork(watchJoinUser),
        fork(watchClearError),
        fork(watchUserLoading),
    ]);
}