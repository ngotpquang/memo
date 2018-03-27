import { FETCH_MEMO, ADD_MEMO } from "../constant/constant";

export function memoReducer(memosState = [], action) {
    switch (action.type) {
        case FETCH_MEMO:
            return Object.assign([], memosState, [...action.memos]);
        case ADD_MEMO:
            console.log(action.message);
            return memosState;
        // case SIGNUP:
        //     return Object.assign({}, state, {
        //         message: action.message
        //     });
        // case LOG_OUT:
        //     localStorage.removeItem("username");
        //     return Object.assign({}, state, {
        //         username: "",
        //         message: action.message
        //     });
        default:
            return memosState;
    }
}