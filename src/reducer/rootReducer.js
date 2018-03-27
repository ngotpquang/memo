import { userReducer } from "./userReducer";
import { memoReducer } from "./memoReducer";

export const initialState = {
    user: {
        username: "",
        userId: -1,
        message: ""
    },
    memos: []
}

/*
function createReducer(initialState, handlers) {
    return function reducer(state = initialState, action) {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action)
        } else {
            return state
        }
    }
}
*/

export function rootReducer(state = initialState, action){
    return {
        user: userReducer(state.user, action),
        memos: memoReducer(state.memos, action)
    }
}