import  {LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT} from '../actionTypes';

const initialState = {
    index : 0,
}

export const userReducer = (prevState=initialState, action) => {

    const {type, payload} = action;
    switch(type) {
        case LOGIN_REQUEST:
            return {
                ...prevState
            }
        case LOGIN_SUCCESS:
            return {
                ...prevState,
                index: payload
            }
        case LOGIN_FAIL: 
            return {
                ...prevState
            }
        case LOGOUT: 
            return {
                ...prevState,
                index: null
            }
        default: return prevState;
    }
}