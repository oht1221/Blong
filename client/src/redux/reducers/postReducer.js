import { POST_LOADING_FAILURE,
    POST_LOADING_REQUEST,
    POST_LOADING_SUCCESS } from "../types";

const initialState = {
    isAuthenticated: null,
    posts: [],
    postDetail: "",
    postCount: "",
    loading: false,
    error: "",
    createdBy: "",
    categoryResult: "",
    title: "",
    searchBy: "",
    searchResult: ""
};

const postReducer = (state = initialState, action) => {
    switch(action.type) {
        case POST_LOADING_REQUEST: 
            return {
                ...state,
                //posts: [],
                loading: true,
            };
        case POST_LOADING_SUCCESS: 
            return {
                ...state,
                posts: [ ...state.posts, ...action.payload]
            };
        case POST_LOADING_FAILURE: 
            return {
                ...state,
                loading: false
            };
        
        default: 
            return state;
    }
}
export default postReducer