import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { push } from "connected-react-router";
import {
  DELETE_POST_REQUEST,
  POST_DETAIL_LOAD_FAILURE,
  POST_DETAIL_LOAD_REQUEST,
  POST_DETAIL_LOAD_SUCCESS,
  POST_LOADING_FAILURE,
  POST_LOADING_REQUEST,
  POST_LOADING_SUCCESS,
  POST_UPLOAD_FAILURE,
  POST_UPLOAD_REQUEST,
  POST_UPLOAD_SUCCESS,
  WRITE_POST_FAILURE,
  WRITE_POST_REQUEST,
  WRITE_POST_SUCCESS,
} from "../types";

const loadPostAPI = () => {
  return axios.get("/post");
};

function* loadPost() {
  try {
    const result = yield call(loadPostAPI);
    console.log(result, "loadPost");

    yield put({
      type: POST_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: POST_LOADING_FAILURE,
      payload: e,
    });
    yield push("/");
  }
}

//Upload Post

const uploadPostAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (payload.token) {
    config.headers["x-auth-token"] = payload.token;
  }

  return axios.post("/post", payload, config);
};

function* uploadPost(action) {
  try {
    console.log(action, "upload post action");
    const result = yield call(uploadPostAPI, action.payload);
    console.log(result, "uploadPost result");

    yield put({
      type: POST_UPLOAD_SUCCESS,
      payload: result.data,
    });
    yield put(push(`/post/${result.data._id}`));
  } catch (e) {
    yield put({
      type: POST_UPLOAD_FAILURE,
      payload: e,
    });
    yield put(push("/"));
  }
}

// Load Post Detail

const loadPostDetailAPI = (payload) => {
  console.log(payload);
  return axios.get(`/post/${payload}`);
};

function* loadPostDetail(action) {
  try {
    console.log(action, "load post detail saga action");
    const result = yield call(loadPostDetailAPI, action.payload);
    console.log(result, "loadPostDetail result");

    yield put({
      type: POST_DETAIL_LOAD_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: POST_DETAIL_LOAD_FAILURE,
      payload: e,
    });
    yield put(push("/"));
  }
}

// Write Post Request

function* writePost(action) {
  try {
    yield put({
      type: WRITE_POST_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: WRITE_POST_FAILURE,
    });
    console.log(e);
  }
}

const deletePostAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (payload.token) {
    config.headers["x-auth-token"] = payload.token;
  }

  console.log(payload);
  return axios.delete(`/post/${payload.id}`, config);
};

function* deletePost(action) {
  try {
    const result = yield call(deletePostAPI, action.payload);

    yield put({
      type: DELETE_POST_SUCCESS,
      payload: result.data,
    });
    yield put(push("/"));
  } catch (e) {
    yield put({
      type: DELETE_POST_FAILURE,
      payload: e,
    });
  }
}

// Watchers
function* watchLoadPost() {
  yield takeEvery(POST_LOADING_REQUEST, loadPost);
}

function* watchUploadPost() {
  yield takeEvery(POST_UPLOAD_REQUEST, uploadPost);
}

function* watchLoadPostDetail() {
  yield takeEvery(POST_DETAIL_LOAD_REQUEST, loadPostDetail);
}

function* watchWritePost() {
  yield takeEvery(WRITE_POST_REQUEST, writePost);
}

function* watchDeletePost() {
  yield takeEvery(DELETE_POST_REQUEST, deletePost);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadPost),
    fork(watchUploadPost),
    fork(watchLoadPostDetail),
    fork(watchWritePost),
    fork(watchDeletePost),
  ]);
}
