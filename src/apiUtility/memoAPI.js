import axios from "axios";
import { APP_URL } from "../configuration/appConfig";

const BASE_URL = `${APP_URL}/api/memo`;

export const fetchMemo = (userId, callBack) => {
    axios.get(`${BASE_URL}/user/id?userId=${userId}`)
    .then((response) => {
        callBack(response.data);
    })
    .catch((error) => {
        console.log("Error: ", error);
    })
}

export const addMemo = (memo, callBack) => {
    axios.post(BASE_URL, memo)
    .then((response) => {
        callBack(response.data);
    })
    .catch((error) => {
        console.log("Error: ", error);
        if (error.includes("304")) {
            callBack("Can't create memo due to errors on server. Please try again.");
        } else if (error.includes("401")) {
            callBack("You don't have right to create a memo. Please contact admin for more information.");
        }
    })
}