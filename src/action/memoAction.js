import { FETCH_MEMO, ADD_MEMO } from "../constant/constant";
import * as API from "../apiUtility/memoAPI";
import { dispatch } from "../index";

export const fetchMemo = (userId) => {
    API.fetchMemo(userId, (data) => {
        dispatch({
            type: FETCH_MEMO,
            memos: data
        })
    });
}

export const addMemo = (memo) => {
    API.addMemo(memo, (message) => {
        dispatch({
            type: ADD_MEMO,
            message: message
        })
    });
}

// export const showLoginMessage = (message) => {
//     dispatch({
//         type: SHOW_LOGIN_MESSAGE,
//         message: message
//     });
// }

// export const signUp = (account) => {
//     API.signup(account, (data) => {
//             dispatch({
//             type: SIGNUP,
//             message: data
//         })
//     });
// }

// export const logout = () => {
//     dispatch({
//         type: LOG_OUT,
//         message: "Logout successfully!"
//     });
// }