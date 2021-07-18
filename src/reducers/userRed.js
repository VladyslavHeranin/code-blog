const SET_USER = "SET_USER"
const LOGOUT = "LOG_OUT"
const USERS_LIST = "USERS_LIST"
const POSTS_LIST = "POSTS_LIST "


const defaultState = {
    currentUser: {},
    isAuth: false,
    list: false
}

export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                currentUser: action.payload,
                list: false,
                isAuth: true,
                posts: false,
            }
        case USERS_LIST:
            return {
                ...state,
                currentUser: action.payload,
                isAuth: true,
                posts: false,
                list: true,
               
            }
        case POSTS_LIST:
            return {
                ...state,
                currentUser: action.payload,
                isAuth: true,
                posts: true,
                list: false,
            }
        case LOGOUT:
            localStorage.removeItem("token")
            return {
                ...state,
                currentUser: {},
                isAuth: false,
                list: false,
                posts: false,
            }
        default:
            return state
    }
}

export const setUser = user => ({ type: SET_USER, payload: user })

export const setList = user => ({ type: USERS_LIST, payload: user })

export const setPostsList = user => ({ type: POSTS_LIST, payload: user })

export const logOut = () => ({ type: LOGOUT })