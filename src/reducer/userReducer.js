import { LOGIN, SIGNUP, SHOW_LOGIN_MESSAGE, LOG_OUT } from "../constant/constant";

export function userReducer(userState = {}, action) {
    switch (action.type) {
        case LOGIN:
            localStorage.setItem("username", action.user.username);
            return Object.assign({}, userState, {
                username: action.user.username,
                userId: action.user.id,
                message: ""
            });
        case SHOW_LOGIN_MESSAGE:
            return Object.assign({}, userState, {
                message: action.message
            });
        case SIGNUP:
            return Object.assign({}, userState, {
                message: action.message
            });
        case LOG_OUT:
            localStorage.removeItem("username");
            return Object.assign({}, userState, {
                username: "",
                message: action.message
            });
        default:
            return userState;
    }
}

// export const userLoggedIn = (state = initialState, action) => {
//     switch (action.type) {
//         case LOGIN:
//             localStorage.setItem("username", action.user.username);
//             return Object.assign({}, state, {
//                 username: action.user.username
//             });
//         default:
//             return state;
//     }
// }

// export const loginMessage = (state = "", action) => {
//     switch (action.type) {
//         case SHOW_LOGIN_MESSAGE:
//             return action.message;
//         default:
//             return state;
//     }
// }

// export const signUpMessage = (state = "", action) => {
//     switch (action.type) {
//         case SIGNUP:
//             return action.message;
//         default:
//             return state;
//     }
// }

// export const logOut = (state = initialState, action) => {
//     switch (action.type) {
//         case LOG_OUT:
//             localStorage.removeItem("username");
//             return action.message;
//         default:
//             return state;
//     }
// }