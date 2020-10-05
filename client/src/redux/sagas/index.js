import { all, fork } from 'redux-saga/effects'
import axios from 'axios'
import authSaga from './authSaga'
import dotenv from 'dotenv'
import postSaga from './postSaga'
import commentSaga from './commentSaga'
dotenv.config();

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

function* rootSaga(){
    yield all([
        fork(authSaga),
        fork(postSaga),
        fork(commentSaga)
    ]);
}

export default rootSaga;