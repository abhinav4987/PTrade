import {LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAIL} from "./../actionTypes";


export const login = (email) => async dispatch  => {

    try{

        dispatch({
            type: LOGIN_REQUEST,
        })
        sessionStorage.setItem("email",email);
        sessionStorage.setItem("index",0);
        dispatch({ 
            type: LOGIN_SUCCESS,
            payload: 0
        })

    } catch (error) {

    }

}