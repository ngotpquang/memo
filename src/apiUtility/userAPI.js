import axios from "axios";
import { APP_URL } from "../configuration/appConfig";
import { showLoginMessage, } from "../action/userAction";

const BASE_URL = `${APP_URL}/api/uzer`;

export const login = (account, callBack) => {
    axios.post(`${BASE_URL}/login`, account)
    .then((response) => {
        callBack(response.data);
    })
    .catch((error) => {
        console.log("Error: ", error);
        showLoginMessage("Wrong username/password. Please try again or sign up new account.");
    })
}

export const signup = (account, callBack) => {
    axios.post(`${BASE_URL}/signup`, account)
    .then((response) => {
        console.log(response.data);
        callBack(response.data);
    })
    .catch((error) => {
        console.log(error);
        if ((error + "").includes("409")){
            callBack("Username has registered. Please choose another.");
        } else if ((error + "").includes("304")){
            callBack("Can't register this user due to errors. Please try again later.");
        } else {
            callBack("There is a problem in our server. Please try again in a few minutes.");
        }
    })
}