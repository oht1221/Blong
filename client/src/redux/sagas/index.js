import { all, fork } from 'redux-saga/effects'
import axios from 'axios'
import authSaga from './authSaga'
import dotenv from 'dotenv'
import postSaga from './postSaga'
dotenv.config();

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

function* rootSaga(){
    yield all([
        fork(authSaga),
        fork(postSaga)
    ]);
}

export default rootSaga;