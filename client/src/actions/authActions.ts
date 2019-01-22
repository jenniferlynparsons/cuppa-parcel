import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { RSAA } from "redux-api-middleware";
import { UserState, Decoded } from "../interfaces/auth-interfaces";
import { History, APIResponse } from "../interfaces/general-interfaces";

// Set the host to work with local dev or Heroku and avoid proxy CORS issues
let backendHost;
const hostname = window && window.location && window.location.hostname;

if (hostname === "localhost") {
  backendHost = "http://localhost:5000";
} else {
  backendHost = "";
}
const API_SERVER = `${backendHost}`;

// Login - get user token
export function loginAction(userData: UserState) {
  return {
    [RSAA]: {
      endpoint: `${API_SERVER}/api/users/login`,
      method: "POST",
      types: [
        "REQUEST",
        {
          type: "SUCCESS",
          payload: async (_action: any, _state: any, res: APIResponse) => {
            console.log(typeof res);
            res = await res.json();
            // Set token to localStorage
            const { token } = res;
            localStorage.setItem("jwtToken", token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            return (dispatch: any) => {
              return {
                type: "SET_CURRENT_USER",
                payload: decoded
              };
            };
          }
        },
        "FAILURE"
      ],
      body: JSON.stringify(userData),
      headers: { "Content-Type": "application/json" }
    }
  };
}

// Register User
export function registerUser(userData: UserState, history: History) {
  return {
    [RSAA]: {
      endpoint: `${API_SERVER}/api/users/register`,
      method: "POST",
      types: [
        "REQUEST",
        {
          type: "SUCCESS",
          payload: async (_action: any, _state: any, _res: APIResponse) => {
            const arg = "/login";
            history.push(arg);
          }
        },
        {
          type: "GET_ERRORS",
          payload: async (_action: any, _state: any, res: APIResponse) => {
            return res.response.data;
          }
        }
      ],
      body: JSON.stringify(userData),
      headers: { "Content-Type": "application/json" }
    }
  };
}

// Set logged in user
export const setCurrentUser = (decoded: Decoded) => {
  return {
    type: "SET_CURRENT_USER",
    payload: decoded
  };
};

// Get current user
export const getCurrentUser = () => (dispatch: any) => {
  dispatch(setUserLoading());
  axios
    .get("/api/user/currentuser")
    .then(res =>
      dispatch({
        type: "GET_CURRENT_USER",
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data
      })
    );
};

// User loading
export const setUserLoading = () => {
  return {
    type: "USER_LOADING"
  };
};

// Log user out
export const logoutUser = () => (dispatch: any) => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
