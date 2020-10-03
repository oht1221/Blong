import axios from 'axios'
import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { POST_LOADING_FAILURE,
    POST_LOADING_REQUEST,
    POST_LOADING_SUCCESS } from '../types'

const loadPostAPI = () => {
    return axios.get('/post');
}

function* loadPost() {
    
    try{
        const result = yield call(loadPostAPI);
        console.log(result, "loadPost");
        
        yield put({
            type: POST_LOADING_SUCCESS,
            payload: result.data
        });
    }
    catch(e){
        yield put({
            type: POST_LOADING_FAILURE,
            payload: e
        });
        yield push('/');
    }
}

function* watchLoadPost() {
    yield takeEvery(POST_LOADING_REQUEST, loadPost);
}

export default function* postSaga() {
    yield all([fork(watchLoadPost)]);
}