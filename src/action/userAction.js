import { LOGIN, SIGNUP, SHOW_LOGIN_MESSAGE, LOG_OUT } from "../constant/constant";
import * as API from "../apiUtility/userAPI";
import { dispatch } from "../index";

export const login = (account) => {
    API.login(account, (data) => {
        dispatch({
            type: LOGIN,
            user: data
        })
    });
}

export const showLoginMessage = (message) => {
    dispatch({
        type: SHOW_LOGIN_MESSAGE,
        message: message
    });
}

export const signUp = (account) => {
    API.signup(account, (data) => {
            dispatch({
            type: SIGNUP,
            message: data
        })
    });
}

export const logout = () => {
    dispatch({
        type: LOG_OUT,
        message: "Logout successfully!"
    });
}