import {
  POST_DETAIL_LOAD_FAILURE,
  POST_DETAIL_LOAD_REQUEST,
  POST_DETAIL_LOAD_SUCCESS,
  POST_LOADING_FAILURE,
  POST_LOADING_REQUEST,
  POST_LOADING_SUCCESS,
	WRITE_POST_FAILURE,
  WRITE_POST_REQUEST,
	WRITE_POST_SUCCESS,
} from "../types";

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
  searchResult: "",
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_LOADING_REQUEST:
      return {
        ...state,
        //posts: [],
        loading: true,
      };
    case POST_LOADING_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, ...action.payload],
      };
    case POST_LOADING_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case POST_DETAIL_LOAD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case POST_DETAIL_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        postDetail: action.payload,
        creatorId: action.payload.creator._id,
        title: action.payload.title,
      };
    case POST_DETAIL_LOAD_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case WRITE_POST_REQUEST:
      return {
					...state,
					posts: [],
          loading: true
      };

    case WRITE_POST_SUCCESS:
      return { 
          ...state,
          loading: false
      };

    case WRITE_POST_FAILURE:
      return {
				...state,
				error: action.payload,
				loading: false
			};

    default:
      return state;
  }
};
export default postReducer;
