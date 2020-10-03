import { 
    LOGIN_SUCCESS,
    LOGIN_REQUEST,
    LOGIN_FAILURE,
    CLEAR_ERROR_REQUEST,
    CLEAR_ERROR_SUCCESS,
    CLEAR_ERROR_FAILURE,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    USER_LOADING_REQUEST,
    USER_LOADING_SUCCESS,
    USER_LOADING_FAILURE,
    JOIN_FAILURE,
    JOIN_SUCCESS,
    JOIN_REQUEST
} from '../types'

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: "",
    userId: "",
    UserName: "",
    userRole: "",
    errorMsg: "",
    successMsg: ""
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case JOIN_REQUEST:
        case LOGIN_REQUEST:
        case LOGOUT_REQUEST:
            return {
                ...state,
                errorMsg: "", // initialize errorMsg
                isLoading: true
            };    

        case LOGIN_SUCCESS:
            localStorage.setItem("token", action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
                userId: action.payload.user.id,
                userRole: action.payload.user.role,
                errorMsg: ""
            };
        case JOIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errorMsg: "",
                successMsg: "joined successfully!",
            };

        case LOGOUT_SUCCESS:
            localStorage.removeItem("token");
            return {
                token: null,
                user: null,
                userId: null,
                isAuthenticated: false,
                isLoading: false,
                userRole: null,
                errorMsg: ""
            };
        case JOIN_FAILURE:
        case LOGIN_FAILURE:
        case LOGOUT_FAILURE:
            localStorage.removeItem("token")
            return {
                ...state,
                ...action.payload,
                token: null,
                user: null,
                userId: null,
                isAuthenticated: false,
                isLoading: false,
                userRole: null,
                errorMsg: action.payload.data.msg
            };
        case CLEAR_ERROR_REQUEST:
            return {
                ...state,
                errorMsg: null 
            };
        case CLEAR_ERROR_SUCCESS:
            return {
                ...state,
                errorMsg: null
            };
        case CLEAR_ERROR_FAILURE:            
            return {
                ...state,
                errorMsg: null
            };
        
        case USER_LOADING_REQUEST:
            return {
                ...state,
                isLoading: true 
            };
        case USER_LOADING_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload,
                userID: action.payload._id,
                userName: action.payload.name,
                userRole: action.payload.role
            };
        case USER_LOADING_FAILURE:            
            return {
                ...state,
                isAuthenticated: false,
                isLoading: false,
                userRole: ""
            };
        default: 
            return state;
    }
}

export default authReducer;